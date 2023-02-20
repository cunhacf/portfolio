import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { helpers } from '@/components/theme';

import LogoFacebook from '@root/public/img/logo-facebook.svg';
import LogoTwitter from '@root/public/img/logo-twitter.svg';

interface Props {
  post?: SanityBlogPost;
}

const Wrap = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(110)};

  h4 {
    margin: 0 0 ${props => props.theme.helpers.toRem(18)};
    ${props => props.theme.helpers.fontSize(18)}
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: .3em;
    line-height: ${props => props.theme.helpers.toRem(24)};
    color: ${props => props.theme.colors.secondary};
  }
`;

const Networks = styled.ul`
  margin: 0;
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
    width: ${props => props.theme.helpers.toRem(36)};
    height: ${props => props.theme.helpers.toRem(36)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.mainDark};

    &:hover {
      background: ${props => props.theme.colors.main};
      color: ${props => props.theme.colors.mainDark};
    }
  }
`;

const Share = ({ post }: Props): JSX.Element | null => {
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  if (!post) return null;

  const openShareWindow = (e: React.MouseEvent<HTMLAnchorElement>, type: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    e.preventDefault();

    switch (type) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank', 'width=500,height=200');
        break;

      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${pageUrl}`, '_blank', 'width=500,height=200');
        break;
    }
  };

  return (
    <Wrap data-aos="fade-left">
      <h4>Compartilhar<br/> notícia</h4>

      <Networks>
        <Network>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            onClick={e => openShareWindow(e, 'facebook')}>

            <LogoFacebook
              width={helpers.toRem(20)}
              height={helpers.toRem(20)} />
          </Link>
        </Network>

        <Network>
          <Link
            href={`https://twitter.com/intent/tweet?text=${post.title}&url=${pageUrl}`}
            onClick={e => openShareWindow(e, 'twitter')}>

            <LogoTwitter
              width={helpers.toRem(20)}
              height={helpers.toRem(20)} />
          </Link>
        </Network>
      </Networks>
    </Wrap>
  );
};

export default Share;
