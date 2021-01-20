import styled from 'styled-components';

const Text = styled.p`
  ${props => {
    return `
    color: ${
      props.light
        ? 'rgba(255,255,255,0.5)'
        : props.lighter
          ? 'rgba(255,255,255,0.7)'
          : '#fff'
    };
   font-size: ${
     props.size ? props.size + 'px' : props.theme.fontSize.sm + 'px'
   };
   line-height: ${props.theme.lineHeight.base};

   text-align: ${props.align ? props.align : ''};
   font-weight: ${props.bold ? props.theme.fontWeight.bold : '400'};

     ${props.uppercase &&
       `
          text-transform: uppercase;
     `} 
   
`;
  }};
`;

Text.span = Text.withComponent('span');

Text.displayName = 'Text';

export default Text;
