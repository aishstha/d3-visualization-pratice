import styled from 'styled-components';
import PropTypes from 'prop-types';

const Heading = styled.span`
  ${props => {
    return `
     color: ${
       props.light
         ? 'rgba(255,255,255,0.5)'
         : props.lighter
           ? 'rgba(255,255,255,0.7)'
           : '#fff'
     };
     color: #fff;
     opacity: ${props.light ? '0.5' : props.lighter ? '0.7' : '1'};
	   font-weight: ${props.theme.fontWeight.base}; 
	   font-size: ${props.theme.fontSize.lg}px; 
       ${props.uppercase &&
         `
            text-transform: uppercase;
       `} 	   
  `;
  }};
`;

Heading.h1 = Heading.withComponent('h1').extend`
	font-size: ${props => props.theme.fontSize.lg + 'px'};
`;
Heading.h1.displayName = 'Heading.h1';

Heading.h2 = Heading.withComponent('h2').extend`
	font-size: ${props => props.theme.fontSize.sm + 'px'};
`;
Heading.h2.displayName = 'Heading.h2';

Heading.h3 = Heading.withComponent('h3').extend`
	font-size: ${props => props.theme.fontSize.xs + 'px'};
`;
Heading.h3.displayName = 'Heading.h3';

Heading.h4 = Heading.withComponent('h4').extend`
	font-size: ${props => props.theme.fontSize.sm + 'px'};
`;
Heading.h4.displayName = 'Heading.h4';

Heading.h5 = Heading.withComponent('h5').extend`
	font-size: ${props => props.theme.fontSize.xs + 'px'};
`;
Heading.h5.displayName = 'Heading.h5';

Heading.h6 = Heading.withComponent('h6').extend`
	font-size: ${props => props.theme.fontSize.xs + 'px'};
`;
Heading.h6.displayName = 'Heading.h6';

Heading.displayName = 'Heading';

Heading.propTypes = {
  light: PropTypes.bool,
  uppercase: PropTypes.bool
};

export default Heading;
