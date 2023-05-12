import styled from 'styled-components';

export const AppContainer = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    .slick-arrow{
        background-color:gray;  
        border-radius:70px;
    }
    .slick-slider{
        width:90%;
        margin:auto;
    }
    
    
`;


export const AppContent = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
