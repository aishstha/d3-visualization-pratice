export const number = (strNum) => {
    if (!strNum) {
        return strNum;
    }
  
    return strNum;
};

export const currency = (num) => {
    const locale = 'US';
    const formattedNum = Number(num).toLocaleString('en-'+locale);
    return formattedNum;
};

export const formattedCurrency = (num) => {
  if (Number(num) === "NaN" || !num) return num;
  return englishNumberFormat(num);
};


const englishNumberFormat= (labelValue) => {
  if (Math.abs(Number(labelValue)) >= 1.0e9) {
    return Number((Math.abs(Number(labelValue)) / 1.0e9).toFixed(0)) + "Bn";
  } else if (Math.abs(Number(labelValue)) >= 1.0e6) {
    return Number((Math.abs(Number(labelValue)) / 1.0e6).toFixed(0)) + "M";
  } else if (Math.abs(Number(labelValue)) >= 1.0e3) {
    return Number((Math.abs(Number(labelValue)) / 1.0e3).toFixed(0)) + "K";
  } else {
    let number = Number(Math.abs(Number(labelValue)))
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .replace(".00", "");
    number = number.split(".")[0];
    return number;
  }
}
