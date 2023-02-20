import Image from 'next/image';
import styled from 'styled-components';
import { lighten } from 'polished';

import sanityImage from '@root/utils/sanityImage';
import Link from 'next/link';

interface Props {
  post: SanityBlogPost;
}

const Wrap = styled.div`
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;
  background: ${props => props.theme.colors.secondary};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.main};
  }
`;

const Thumb = styled.div`
  border-radius: ${props => props.theme.helpers.toRem(20)};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`;

const Title = styled.div`
  padding: ${props => props.theme.helpers.toRem(18)} ${props => props.theme.helpers.toRem(25)} ${props => props.theme.helpers.toRem(28)};

  ${Wrap}:hover & {
    h4 {
      color: ${props => props.theme.colors.secondary};
    }
  }

  h4 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(27)}
    font-weight: 700;
    color: ${props => lighten(0.44, props.theme.colors.secondary)};
    transition: all 0.2s;
  }
`;

const Post = ({ post }: Props): JSX.Element => {
  return (
    <Wrap>
      <Link href={`/blog/${post.slug.current}`}>
        {post.image && <Thumb>
          <Image
            width={362}
            height={260}
            src={sanityImage(post.image).width(362).height(260).url()}
            alt={`Imagem da postagem "${post.title}"`} />
        </Thumb>}

        <Title>
          <h4>{post.title}</h4>
        </Title>
      </Link>
    </Wrap>
  );
};

export default Post;
