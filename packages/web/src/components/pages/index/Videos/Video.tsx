import Image from 'next/image';
import styled from 'styled-components';

import sanityImage from '@root/utils/sanityImage';
import Link from 'next/link';

interface Props {
  video: SanityVideo;
}

const Wrap = styled.div`
`;

const Thumb = styled.div`
  border-radius: ${props => props.theme.helpers.toRem(10)};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`;

const Title = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(23)};

  ${Wrap}:hover & {
    h3 {
      color: ${props => props.theme.colors.main};
    }
  }

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(25)}
    font-weight: 400;
    color: ${props => props.theme.colors.secondaryAlt};
    transition: all 0.2s;
  }
`;

const Video = ({ video }: Props): JSX.Element => {
  return (
    <Wrap>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "${video.title}",
              "description": "${video.title}",
              "thumbnailUrl": "${sanityImage(video.image || '').url()}",
              "uploadDate": "${video._createdAt}",
              "contentUrl": "${video.videoUrl}"
            }
          `
        }} />

      <Link href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        {video.image && <Thumb>
          <Image
            width={380}
            height={214}
            src={sanityImage(video.image).width(380).height(214).url()}
            alt={`Imagem do vídeo "${video.title}"`} />
        </Thumb>}

        <Title>
          <h3>{video.title}</h3>
        </Title>
      </Link>
    </Wrap>
  );
};

export default Video;
