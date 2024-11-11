import { z } from "zod";

const idSchema = z.object({
  _id: z.string(),
});

export default idSchema;
