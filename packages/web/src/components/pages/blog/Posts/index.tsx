import styled from 'styled-components';

import Post from './Post';

interface Props {
  posts?: SanityBlogPost[];
}

const Wrap = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(42)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: ${props => props.theme.helpers.toRem(90)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Posts = ({ posts }: Props): JSX.Element | null => {
  if (!posts?.length) return null;

  return (
    <Wrap>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </Wrap>
  );
};

export default Posts;
