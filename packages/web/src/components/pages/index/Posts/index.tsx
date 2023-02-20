import styled from 'styled-components';
import { rgba } from 'polished';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';

import Post from './Post';

interface Props {
  section: SanityHomeContentBlock;
  posts?: SanityBlogPost[];
  highlights?: SanityBlogPost[];
}

const Wrap = styled(Section)<Props>`
  margin-top: ${props => props.theme.helpers.toRem(-144)};
  position: relative;
  z-index: 2;
  overflow: hidden;

  ${SectionHeader} {
    display: flex;
    justify-content: flex-end;
  }
`;

const PostList = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(40)};
  padding: ${props => props.theme.helpers.toRem(60)} 0 ${props => props.theme.helpers.toRem(70)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.helpers.toRem(90)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${props => props.theme.helpers.toRem(40)};
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.helpers.toRem(20)};
  }

  &:before {
    content: '';
    height: 100%;
    width: 9999px;
    position: absolute;
    top: 0;
    left: 50%;
    border-radius: ${props => props.theme.helpers.toRem(30)};
    background: ${props => rgba(props.theme.colors.mainDark, 0.7)};
    z-index: -1;
  }
`;

const Posts = ({ section, posts, highlights = [] }: Props): JSX.Element | null => {
  if (!posts?.length || section?.disabled) return null;

  const postArray = [
    ...highlights,
    ...posts.filter(post => {
      if (!highlights.length) return true;

      return highlights.find(p => p._id !== post._id);
    })
  ];

  return (
    <Wrap
      id="novidades"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'novidades'}</h2>
        </SectionHeader>

        <SectionContent data-aos="fade-up">
          <PostList>
            {postArray.map(post => <Post key={post._id} post={post} />)}
          </PostList>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Posts;
