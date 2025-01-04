export const getNextDayDate = (numOfDays: number) => {
  const today = new Date();
  const newDay = new Date(today);
  newDay.setDate(today.getDate() + numOfDays);

  return newDay;
};
