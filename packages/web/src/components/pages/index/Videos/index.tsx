import styled from 'styled-components';
import { rgba } from 'polished';
import useSWR from 'swr';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import bgHomeVideos from '@root/public/img/bg-home-videos.png';

import sanityImage from '@root/utils/sanityImage';

import Subscribe from './Subscribe';
import Video from './Video';
import Share from './Share';

interface Props {
  config: SanitySiteConfig;
  section: SanityHomeVideos;
  videos?: SanityVideo[];
  highlights?: SanityVideo[];
}

const Wrap = styled(Section)<Omit<Props, 'config'>>`
  padding-top: ${props => props.theme.helpers.toRem(106)};
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    padding-top: 40px;
  }

  &:before {
    content: '';
    width: 100%;
    height: ${props => props.theme.helpers.toRem(1596)};
    position: absolute;
    top: ${props => props.theme.helpers.toRem(-456)};
    left: 0;
    background: url(${bgHomeVideos.src}) center no-repeat;
    background-size: contain;
    z-index: -1;
  }

  ${SectionHeader} {
    padding-right: ${props => props.theme.helpers.toRem(160)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
      display: block;
    }

    h2 {
      color: ${props => props.theme.colors.secondaryAlt};

      @media screen and (max-width: 1200px) {
        margin-bottom: 20px;
      }
    }
  }
`;

const Highlight = styled.div`
  margin: ${props => props.theme.helpers.toRem(100)} ${props => props.theme.helpers.toRem(160)} 0;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1200px) {
    margin: 40px 0 0;
  }
`;

const Embed = styled.div`
  iframe {
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
  }
`;

const Details = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(30)};
  text-align: center;

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(60)}
    font-weight: 600;

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(50)}
    }

    @media screen and (max-width: 768px) {
      ${props => props.theme.helpers.fontSize(40)}
    }
  }

  p {
    margin: ${props => props.theme.helpers.toRem(9)} 0 0;
    ${props => props.theme.helpers.fontSize(35)}
    color: ${props => props.theme.colors.secondaryAlt};

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(30)}
    }

    @media screen and (max-width: 768px) {
      ${props => props.theme.helpers.fontSize(27)}
    }
  }
`;

const VideoList = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(70)};
  padding: 0 0 ${props => props.theme.helpers.toRem(106)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.helpers.toRem(66)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.helpers.toRem(30)};
  }

  &:before {
    content: '';
    width: ${props => props.theme.helpers.toRem(1806)};
    height: ${props => props.theme.helpers.toRem(812)};
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: ${props => props.theme.helpers.toRem(30)};
    background: ${props => rgba(props.theme.colors.mainDark, 0.7)};
    transform: translateX(-50%);
    z-index: -1;
  }
`;

const Videos = ({ config, section, videos, highlights = [] }: Props): JSX.Element | null => {
  const videoArray = [
    ...highlights,
    ...videos?.filter(video => {
      if (!highlights.length) return true;

      return highlights.find(v => v._id !== video._id);
    }) || []
  ];
  const oembed = useSWR<any>(`https://youtube.com/oembed?url=${videoArray?.[0].videoUrl}`);

  if (!videos?.length || section?.disabled) return null;

  return (
    <Wrap
      id="lancamentos"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'lançamentos'}</h2>
          <Share video={videoArray[0]} />
        </SectionHeader>

        <SectionContent data-aos="fade-down">
          <Highlight>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
                  {
                    "@context": "https://schema.org",
                    "@type": "VideoObject",
                    "name": "${videoArray[0].title}",
                    "description": "${videoArray[0].title}",
                    "thumbnailUrl": "${sanityImage(videoArray[0].image || '').url()}",
                    "uploadDate": "${videoArray[0]._createdAt}",
                    "contentUrl": "${videoArray[0].videoUrl}"
                  }
                `
              }} />

            {oembed.data && (
              <Embed
                data-aos="fade-up"
                data-aos-delay="200"
                dangerouslySetInnerHTML={{
                  __html: oembed.data.html
                }} />
            )}

            <Details>
              <h3 data-aos="fade-up" data-aos-delay="200">{videoArray[0].title}</h3>
              {videoArray[0].viewCount && <p data-aos="fade-down" data-aos-delay="400">{Intl.NumberFormat('pt-BR').format(videoArray[0].viewCount)} visualizaç{videoArray[0].viewCount === 1 ? 'ão' : 'ões'} até o momento</p>}
            </Details>

            <Subscribe url={config?.networks?.find(network => network.type === 'youtube')?.url} />
          </Highlight>

          <VideoList data-aos="fade-down" data-aos-delay="200">
            {videoArray.map((video, index) => index > 0 && <Video key={video._id} video={video} />)}
          </VideoList>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Videos;
