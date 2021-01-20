import { css } from 'styled-components';

/**
 *
 * @param direction     value for flex-direction
 * @param justify       value for justify-content
 * @param align         value for align-items
 * @returns {*}
 */
const flex = (direction, justify, align) => (
    css`
     display: flex;
     ${props => justify && `
        justify-content: ${justify};
     `}

      ${props => align && `
       align-items: ${align};
     `}
      
      ${props => direction && `
        flex-direction: ${direction};
      ` }
    `
);


export default flex;
