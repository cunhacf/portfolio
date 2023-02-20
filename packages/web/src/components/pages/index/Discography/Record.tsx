import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { helpers } from '@/components/theme';

import LogoSpotify from '@root/public/img/logo-spotify.svg';
import LogoAppleMusic from '@root/public/img/logo-applemusic.svg';
import LogoDeezer from '@root/public/img/logo-deezer.svg';
import LogoTidal from '@root/public/img/logo-tidal.svg';
import LogoAmazonMusic from '@root/public/img/logo-amazonmusic.svg';
import LogoYouTubeMusic from '@root/public/img/logo-youtubemusic.svg';
import LogoSuaMusica from '@root/public/img/logo-suamusica.svg';

import sanityImage from '@root/utils/sanityImage';

interface Props {
  record: SanityRecord;
}

const Wrap = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled.header`
  text-align: right;
`;

const Name = styled.h3`
  margin: 0;
  ${props => props.theme.helpers.fontSize(46)}
  font-weight: 600;
`;

const RecordDate = styled.div`
  ${props => props.theme.helpers.fontSize(35)}
`;

const Content = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(72)};
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: ${props => props.theme.helpers.toRem(16)};
  grid-template-areas:
    'none none cover cover cover cover platforms platforms'
  ;

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

const Cover = styled.div`
  grid-area: cover;

  @media screen and (max-width: 1200px) {
    max-width: 600px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: top;
  }
`;

const Platforms = styled.ul`
  margin: 0;
  position: relative;
  padding: 0 0 calc(${props => props.theme.helpers.toRem(88)} + ${props => props.theme.helpers.toRem(30)}) ${props => props.theme.helpers.toRem(54)};
  grid-area: platforms;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: 20px;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

const Platform = styled.li`
  list-style: none;

  @media screen and (max-width: 1200px) {
    margin: 20px;
  }

  &:not(:first-child) {
    margin-top: ${props => props.theme.helpers.toRem(52)};

    @media screen and (max-width: 1200px) {
      margin-top: 20px;
    }
  }

  a {
    color: ${props => props.theme.colors.main};

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.secondary};
    }
  }

  svg {
    vertical-align: top;
  }
`;

const Record = ({ record }: Props): JSX.Element => {
  const parsedDate = new Date(record.releaseDate + 'T00:00');
  const year = Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(parsedDate);

  return (
    <Wrap>
      <Header>
        <Name data-aos="fade-right" data-aos-delay="200">{record.name}</Name>
        <RecordDate data-aos="fade-right" data-aos-delay="400">{year}</RecordDate>
      </Header>

      <Content>
        <Cover data-aos="fade-down" data-aos-delay="200">
          <Image
            width={852}
            height={852}
            src={sanityImage(record.cover).url()}
            alt={`Capa do álbum "${record.name}"`} />
        </Cover>

        {(record.platforms && record.platforms?.length > 0) && <Platforms>
          {record.platforms?.map((platform, index) => (
            <Platform data-aos="fade-right" data-aos-delay={200 + (50 * index)} key={`platform-${index}`}>
              <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                {platform.type === 'spotify' && (
                  <LogoSpotify
                    width={helpers.toRem(204)}
                    height={helpers.toRem(62)}
                    title="Spotify" />
                )}

                {platform.type === 'apple-music' && (
                  <LogoAppleMusic
                    width={helpers.toRem(180)}
                    height={helpers.toRem(42)}
                    title="Apple Music" />
                )}

                {platform.type === 'deezer' && (
                  <LogoDeezer
                    width={helpers.toRem(172)}
                    height={helpers.toRem(37)}
                    title="Deezer" />
                )}

                {platform.type === 'tidal' && (
                  <LogoTidal
                    width={helpers.toRem(188)}
                    height={helpers.toRem(38)}
                    title="Tidal" />
                )}

                {platform.type === 'amazon-music' && (
                  <LogoAmazonMusic
                    width={helpers.toRem(292)}
                    height={helpers.toRem(57)}
                    title="Amazon Music" />
                )}

                {platform.type === 'youtube-music' && (
                  <LogoYouTubeMusic
                    width={helpers.toRem(174)}
                    height={helpers.toRem(43)}
                    title="YouTube Music" />
                )}

                {platform.type === 'sua-musica' && (
                  <LogoSuaMusica
                    width={helpers.toRem(210)}
                    height={helpers.toRem(73)}
                    title="Sua Música" />
                )}
              </Link>
            </Platform>
          ))}
        </Platforms>}
      </Content>
    </Wrap>
  );
};

export default Record;
