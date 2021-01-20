import base from './base';
import reset from 'styled-reset';
import {injectGlobal} from 'styled-components';

const baseStyles = () => injectGlobal`
    ${reset}
    ${base}
`;


export default baseStyles;