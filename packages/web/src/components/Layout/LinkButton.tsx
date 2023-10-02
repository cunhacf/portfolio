import styled from 'styled-components';

import { buttonStyle } from './Button';

type Props = {
  muted?: boolean;
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const LinkButton = styled.a<Props>`
  && {
    ${buttonStyle};
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default LinkButton;
