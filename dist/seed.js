"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const faker_1 = require("@faker-js/faker");
const user_model_1 = require("./models/user/user.model");
const category_model_1 = require("./models/category/category.model");
const sub_category_model_1 = require("./models/sub-category/sub-category.model");
const product_model_1 = require("./models/product/product.model");
const mongoose_1 = __importDefault(require("mongoose"));
const keys_1 = require("./lib/keys");
const categories = ["Men's", "Women's", "Kid's"];
const subCategories = {
    "Men's": ["Shirts", "Trousers", "Shoes"],
    "Women's": ["Dresses", "Handbags", "Jewelry"],
    "Kid's": ["Toys", "Clothes", "Books"],
};
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    const { DB_URL } = keys_1.KEYS;
    try {
        console.info("Connecting to MongoDB...");
        yield mongoose_1.default.connect(DB_URL);
        console.log("✅ MongoDB Connected");
        console.info("Creating Admin User...");
        const adminUser = yield user_model_1.User.create({
            fullName: "Joy Boy",
            email: "jishankhannew@gmail.com",
            role: "ADMIN",
            password: bcryptjs_1.default.hashSync("Incorrect18ren@"),
            userType: "jwt",
            isVerified: true,
        });
        console.info("✅ Admin User Created");
        console.info("Creating Categories...");
        const categoryDocs = yield category_model_1.Category.insertMany(categories.map((name) => ({ name })));
        console.info("✅ Categories Created");
        console.info("Creating Subcategories...");
        const subCategoryData = categoryDocs.flatMap((categoryDoc) => {
            const subCategoryNames = subCategories[categoryDoc.name];
            if (!subCategoryNames) {
                console.warn(`⚠️ No subcategories found for category: ${categoryDoc.name}`);
                return [];
            }
            return subCategoryNames.map((subCategoryName) => ({
                name: subCategoryName,
                category: categoryDoc._id,
            }));
        });
        const subCategoryDocs = yield sub_category_model_1.SubCategory.insertMany(subCategoryData);
        console.info("✅ Subcategories Created");
        console.info("Creating Products...");
        const productData = subCategoryDocs.flatMap((subCategoryDoc) => {
            var _a;
            const subCategoryCategoryId = (_a = subCategoryDoc.category) === null || _a === void 0 ? void 0 : _a.toString();
            const category = categoryDocs.find((cat) => cat._id.toString() === subCategoryCategoryId);
            if (!category) {
                console.warn(`⚠️ No matching category found for subcategory: ${subCategoryDoc.name} (Category ID: ${subCategoryCategoryId})`);
                return [];
            }
            return Array.from({ length: 10 }).map(() => ({
                name: faker_1.faker.commerce.productName(),
                desc: faker_1.faker.commerce.productDescription(),
                price: faker_1.faker.commerce.price({ min: 100, max: 1000 }),
                stock: faker_1.faker.number.int({ min: 10, max: 100 }),
                imageLinks: [
                    faker_1.faker.image.url({ width: 300, height: 300 }),
                    faker_1.faker.image.url({ width: 300, height: 300 }),
                    faker_1.faker.image.url({ width: 300, height: 300 }),
                ],
                category: category._id,
                categoryName: category.name,
                subCategory: subCategoryDoc._id,
                subCategoryName: subCategoryDoc.name,
                createdBy: adminUser._id,
                updatedBy: adminUser._id,
            }));
        });
        if (productData.length === 0) {
            console.warn("⚠️ No products to insert!");
        }
        else {
            yield product_model_1.Product.insertMany(productData);
            console.info("✅ Products Created");
        }
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
    }
    finally {
        yield mongoose_1.default.disconnect();
        console.log("✅ Database disconnected");
    }
});
seed();
//# sourceMappingURL=seed.js.map