import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  min-height: 90vh;
  min-width: 70vw;
`;

export const BooksArticlesSection = styled.section`
  margin: 64px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
`;

//   h2 {
//     font-size: 32px;
//     font-weight: bold;
//     margin-bottom: 20px;
//     color: #333;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//   }
// `;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  @media (max-width: 767px) {
    justify-content: center;
  }
`;

