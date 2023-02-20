import styled from 'styled-components';

import { buttonStyle } from './Button';

const LinkButton = styled.a`
  && {
    ${buttonStyle};
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default LinkButton;
