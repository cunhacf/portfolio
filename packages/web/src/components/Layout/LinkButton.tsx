import styled from 'styled-components';

import { buttonStyle } from './Button';

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  muted?: boolean;
}

const StyledLinkButton = ({ muted, ...props }: React.PropsWithChildren<Props>) => <a {...props} />;

const LinkButton = styled(StyledLinkButton)`
  && {
    ${buttonStyle};
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
`;

export default LinkButton;
