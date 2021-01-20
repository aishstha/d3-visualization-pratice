import { dashboardEnglish } from './dashboard';
import { commonEnglish } from './common';
import { number, currency, formattedCurrency } from './number';
import { getMonthName, date, getAllMonths } from './month';
import { helpTextEnglish } from './helpText';
import { detailEnglish } from './detail';
import { projectsEnglish } from './projects';

const commonLocalization = {
  en: commonEnglish,
};

const dashboardLocalization = {
  en: dashboardEnglish,
};


const helpTextLocalization = {
  en: helpTextEnglish,
};

const detailLocalization = {
  en: detailEnglish,
};

const projectsLocalization = {
  en: projectsEnglish,
};

export {
  commonLocalization,
  dashboardLocalization,
  detailLocalization,
  projectsLocalization,
  number,
  currency,
  getMonthName,
  date,
  getAllMonths,
  formattedCurrency,
  helpTextLocalization,
};
