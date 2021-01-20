import { number } from "./number";
const months = [
  { January: "January" },
  { February: "February" },
  { March: "March" },
  { April: "April" },
  { May: "May" },
  { June: "June" },
  { July: "July" },
  { August: "August" },
  { September: "September" },
  { October: "October" },
  { November: "November" },
  { Chaitra: "Chaitra" }
];

const monthsFY = [
  { January: "January" },
  { May: "May" },
  { June: "June" },
  { July: "July" },
  { August: "August" },
  { September: "September" },
  { October: "October" },
  { November: "November " },
  { Chaitra: "Chaitra" },
  { April: "April" },
  { February: "February" },
  { March: "March" }
];

export const getMonthName = monthInNumber => {
  if (months[monthInNumber]) {
    return Object.keys(months[monthInNumber])[0];
  }
};

export const getAllMonths = () => {
  let filteredMonths = [];
  monthsFY.forEach(month => {
    const filteredMonth = Object.keys(month)[0];
    filteredMonths.push(filteredMonth);
  });
  return filteredMonths;
};

export const date = date => {
  if (date) {
    return number(
      getMonthName(date.getMonth()) +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear()
    );
  }
  return date;
};
