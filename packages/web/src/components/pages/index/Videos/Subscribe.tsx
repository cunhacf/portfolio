import Link from 'next/link';
import styled from 'styled-components';

import { helpers } from '@/components/theme';

import LogoYouTube from '@root/public/img/logo-youtube.svg';

interface Props {
  url?: string;
}

const Wrap = styled.div`
  position: absolute;
  top: ${props => props.theme.helpers.toRem(80)};
  left: ${props => props.theme.helpers.toRem(-160)};
  color: ${props => props.theme.colors.secondaryAlt};

  @media screen and (max-width: 1200px) {
    margin-top: 30px;
    position: relative;
    top: 0%;
    left: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    margin: 0 0 ${props => props.theme.helpers.toRem(7)};
    ${props => props.theme.helpers.fontSize(30)}
    font-weight: 600;
    line-height: ${props => props.theme.helpers.toRem(32)};
  }
`;

const SubscribeButton = styled(Link)`
  margin-top: ${props => props.theme.helpers.toRem(26)};
  padding: ${props => props.theme.helpers.toRem(8)} ${props => props.theme.helpers.toRem(30)};
  display: block;
  border-radius: ${props => props.theme.helpers.toRem(5)};
  ${props => props.theme.helpers.fontSize(39)}
  text-transform: uppercase;
  background: ${props => props.theme.colors.youtube};
  color: ${props => props.theme.colors.main};

  @media screen and (max-width: 1200px) {
    display: inline-block;
  }

  @media screen and (max-width: 768px) {
    ${props => props.theme.helpers.fontSize(27)}
  }

  &:hover {
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.youtube};
  }
`;

const Subscribe = ({ url }: Props): JSX.Element | null => {
  if (!url) return null;

  return (
    <Wrap data-aos="fade-right" data-aos-delay="200">
      <h4>assista<br/> ao clipe no</h4>

      <LogoYouTube
        width={helpers.toRem(268)}
        height={helpers.toRem(60)} />

      <SubscribeButton
        href={url}
        target="_blank"
        rel="noopener noreferrer">

        Inscrever-se
      </SubscribeButton>
    </Wrap>
  );
};

export default Subscribe;
