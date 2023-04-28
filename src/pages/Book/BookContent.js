import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContextProvider";
import EditIcon from "../../components/icons/EditIcon";
import CustomEditor from "../../components/Editor/CustomEditor";
import {PageContext} from "../../context/PageContextProvider";
import withLoading from "../../components/HOC/WithLoading";
import {LoadingContext} from "../../context/LoadingContextProvider";

const BookPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #2c3e50;
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
  color: #7f8c8d;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  max-width: 800px;
`;

const EditIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const BookContent = ({ bookId, pageId }) => {
    const { page, onSave: onPageSave, onUpdate: onPageUpdate, onFetch: onPageFetch, onDelete } = useContext(PageContext);
    const { user } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const [isEditing, setIsEditing] = useState(false);

    const handleContentEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleTitleEditClick = () => {
        console.log("Edit Clicked");
    }

    const savePage = async (pageId, content) => {
        await onPageUpdate(pageId, JSON.stringify({ content }));
    }

    useEffect(() => {
        setLoading(true);
        onPageFetch(bookId, pageId).then(() => setLoading(false));
    }, [bookId, pageId]);

    return (
        <BookPageContainer>
            <EditIconWrapper>
                {user.isLoggedIn && <EditIcon onClick={handleTitleEditClick} />}
            </EditIconWrapper>
            <Title>{page.title}</Title>
            <Content>
                <CustomEditor isEditing={isEditing} content={page.content} pageId={pageId} savePage={savePage} handleEditClick={handleContentEditClick} />
            </Content>
        </BookPageContainer>
    );
};

export default withLoading(BookContent);
