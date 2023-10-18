import styled from 'styled-components';

const Container = styled.div`
  max-width: calc(1360px + ${props => props.theme.helpers.toRem(40)});
  margin: 0 auto;
  padding: 0 calc(${props => props.theme.helpers.toRem(20)} + env(safe-area-inset-right)) 0 calc(${props => props.theme.helpers.toRem(20)} + env(safe-area-inset-left));
`;

export default Container;
