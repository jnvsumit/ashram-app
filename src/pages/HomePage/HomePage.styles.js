import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 16px;
`;

export const Main = styled.main``;

export const CarouselSection = styled.section`
  margin: 32px 0;
`;

export const BooksArticlesSection = styled.section`
  margin: 64px 0;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const VideoSection = styled.section`
    margin: 64px 0;
    
    h2 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
    }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContextSection = styled.section`
  margin: 64px 0;

  h2 {
    margin-bottom: 32px;
  }
`;
