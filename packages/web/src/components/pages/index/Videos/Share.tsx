import Link from 'next/link';
import styled from 'styled-components';

import { helpers } from '@/components/theme';

import LogoWhatsApp from '@root/public/img/logo-whatsapp.svg';
import LogoFacebookSquare from '@root/public/img/logo-facebook-square.svg';

interface Props {
  video?: SanityVideo;
}

const Wrap = styled.div`
  padding: ${props => props.theme.helpers.toRem(18)} ${props => props.theme.helpers.toRem(40)};
  display: inline-flex;
  align-items: center;
  border-radius: ${props => props.theme.helpers.toRem(10)};
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.mainDark};

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(39)}
    font-weight: 600;
    text-transform: none;
    letter-spacing: initial;
    color: ${props => props.theme.colors.mainDark};

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(29)}
    }
  }
`;

const Networks = styled.ul`
  margin: 0 0 0 ${props => props.theme.helpers.toRem(24)};
  padding: 0;
  display: flex;
  align-items: center;
  list-style: none;
`;

const Network = styled.li`
  &:not(:first-child) {
    margin-left: ${props => props.theme.helpers.toRem(18)};
  }

  a {
    color: ${props => props.theme.colors.mainDark};

    &:hover {
      color: ${props => props.theme.colors.main};
    }
  }

  svg {
    vertical-align: top;

    @media screen and (max-width: 1200px) {
      width: 24px;
      height: 24px;
    }
  }
`;

const Share = ({ video }: Props): JSX.Element | null => {
  if (!video) return null;

  const openShareWindow = (e: React.MouseEvent<HTMLAnchorElement>, type: 'facebook' | 'whatsapp') => {
    e.preventDefault();

    switch (type) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${video.videoUrl}`, '_blank', 'width=500,height=200');
        break;

      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(video.title)}%20${video.videoUrl}`, '_blank', 'width=500,height=200');
        break;
    }
  };

  return (
    <Wrap data-aos="fade-right" data-aos-delay="200">
      <h3>compartilhe</h3>

      <Networks>
        <Network>
          <Link
            href={`https://wa.me/?text=${video.title}%20${video.videoUrl}`}
            onClick={e => openShareWindow(e, 'whatsapp')}>

            <LogoWhatsApp
              width={helpers.toRem(44)}
              height={helpers.toRem(44)} />
          </Link>
        </Network>

        <Network>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${video.videoUrl}`}
            onClick={e => openShareWindow(e, 'facebook')}>

            <LogoFacebookSquare
              width={helpers.toRem(44)}
              height={helpers.toRem(44)} />
          </Link>
        </Network>
      </Networks>
    </Wrap>
  );
};

export default Share;
