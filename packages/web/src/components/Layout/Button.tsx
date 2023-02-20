import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface Props {
  muted?: boolean;
}

export const buttonStyle = css<Props>`
  height: 50px;
  padding: 0 20px;
  flex-shrink: 0;
  border: 0;
  border-radius: 10px;
  font-family: inherit;
  ${props => props.theme.helpers.fontSize(16)};
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  background: ${props => props.muted ? props.theme.colors.secondaryAlt : props.theme.colors.secondary};
  color: ${props => props.muted ? props.theme.colors.mainDark : props.theme.colors.main};
  transition: all 0.2s;

  @media screen and (max-width: 640px) {
    height: 38px;
    padding: 0 20px;
  }

  &:hover,
  &:focus {
    outline: none;
    background: ${props => props.muted ? props.theme.colors.secondary : props.theme.colors.mainDark};
    color: ${props => props.theme.colors.main};
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
    pointer-events: none;
  }
`;

const Button = styled.button<Props>`
  ${buttonStyle}
`;

export default Button;
