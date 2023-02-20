import styled from 'styled-components';

export const Section = styled.section`
  margin-top: 60px;
`;

export const SectionHeader = styled.header`
  margin-bottom: 40px;

  h1 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(65)}
    font-weight: 700;
    color: ${props => props.theme.colors.secondaryAlt};

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(45)}
    }
  }

  h2 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(32)}
    font-weight: 600;
  }

  h3 {
    ${props => props.theme.helpers.fontSize(30)}
    font-weight: 600;
    letter-spacing: .5em;
    text-align: center;
    color: ${props => props.theme.colors.secondary};
    text-transform: uppercase;

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(20)}
    }
  }

  p {
    margin: 10px 0 0;
  }
`;

export const SectionContent = styled.div`

`;

export default Section;
