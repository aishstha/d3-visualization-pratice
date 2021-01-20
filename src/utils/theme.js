import { colors, shades } from 'utils';
import defaults from './defaults';
const { primary, sec } = colors;
const { neutrals, teals, dark } = shades;
const { fontFamily, fontSize, fontWeight, lineHeight, transition } = defaults;

const theme = {
  primary,
  sec,
  neutrals,
  teals,
  dark,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  transition
};

export default theme;
