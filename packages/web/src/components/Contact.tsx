import Link from 'next/link';
import styled from 'styled-components';

import LinkButton from '@/components/LinkButton';
import { helpers } from '@/components/theme';
import { useTranslation } from '@/components/Translation';

import IconYouTube from '@/assets/img/icon-youtube.svg';
import IconInstagram from '@/assets/img/logo-instagram.svg';
import IconFacebook from '@/assets/img/logo-facebook.svg';
import IconTwitter from '@/assets/img/logo-twitter.svg';
import IconTikTok from '@/assets/img/logo-tiktok.svg';
import IconGitHub from '@/assets/img/logo-github.svg';
import IconLinkedIn from '@/assets/img/logo-linkedin.svg';

interface Props {
  config: SanitySiteConfig;
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Social = styled.div`
  display: flex;
  align-items: center;

  a {
    padding: 15px;
    display: block;
    border-radius: 10px;
    background: ${props => props.theme.colors.secondaryAlt};
    color: ${props => props.theme.colors.mainDark};

    &:hover,
    &:focus {
      background: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.main};
    }
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    list-style: none;

    li {
      margin-left: 20px;

      @media screen and (max-width: 640px) {
        margin-left: 10px;
      }

      svg {
        vertical-align: top;
      }
    }
  }
`;

const Contact = ({ config }: Props) => {
  const { t } = useTranslation();

  return (
    <Wrap>
      {config.contactUrl && <LinkButton href={config.contactUrl}>{t('contactButtonLabel')}</LinkButton>}

      {(config.networks && config.networks?.length > 0) && (
        <Social>
          <ul>
            {config.networks?.map((network, index) => (
              <li key={`network-${index}`}>
                <Link href={network.url} target="_blank" rel="noopener noreferrer">
                  {network.type === 'instagram' && (
                    <IconInstagram
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="Instagram" />
                  )}

                  {network.type === 'facebook' && (
                    <IconFacebook
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="Facebook" />
                  )}

                  {network.type === 'twitter' && (
                    <IconTwitter
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="Twitter" />
                  )}

                  {network.type === 'tiktok' && (
                    <IconTikTok
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="TikTok" />
                  )}

                  {network.type === 'github' && (
                    <IconGitHub
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="GitHub" />
                  )}

                  {network.type === 'linkedin' && (
                    <IconLinkedIn
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="LinkedIn" />
                  )}

                  {network.type === 'youtube' && (
                    <IconYouTube
                      width={helpers.toRem(20)}
                      height={helpers.toRem(20)}
                      title="YouTube" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Social>
      )}
    </Wrap>
  )
};

export default Contact;
