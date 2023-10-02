import type { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import LinkButton from '@/components/Layout/LinkButton';
import { helpers } from '@/components/theme';

import IconYouTube from '@root/public/img/icon-youtube.svg';
import IconInstagram from '@root/public/img/logo-instagram.svg';
import IconFacebook from '@root/public/img/logo-facebook.svg';
import IconTwitter from '@root/public/img/logo-twitter.svg';
import IconTikTok from '@root/public/img/logo-tiktok.svg';
import IconGitHub from '@root/public/img/logo-github.svg';
import IconLinkedIn from '@root/public/img/logo-linkedin.svg';

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
  const { t } = useTranslation('common');

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
