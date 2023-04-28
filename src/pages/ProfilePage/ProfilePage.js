import React, {useContext, useEffect} from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
    ProfilePageContainer,
    ProfileTitle,
    ProfileDetails,
    Detail,
    DetailLabel,
    DetailSpan,
    StyledButton, StyledButtonWrapper,
} from "./ProfilePage.styles";

function ProfilePage() {
    const { user, onLogout, onUserFetch } = useContext(UserContext);

    const handleLogout = () => {
        onLogout();
    };


    useEffect(() => {
        onUserFetch();
    }, []);

    return (
        <ProfilePageContainer>
            <ProfileTitle>Hi {user.name}</ProfileTitle>
            <ProfileDetails>
                <Detail>
                    <DetailLabel>Name:</DetailLabel>
                    <DetailSpan>{user.name}</DetailSpan>
                </Detail>
                <Detail>
                    <DetailLabel>Email:</DetailLabel>
                    <DetailSpan>{user.email}</DetailSpan>
                </Detail>
                <Detail>
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailSpan>{user.phone}</DetailSpan>
                </Detail>
                <Detail>
                    <DetailLabel>Username:</DetailLabel>
                    <DetailSpan>{user.username}</DetailSpan>
                </Detail>
            </ProfileDetails>
            <StyledButtonWrapper>
                <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </StyledButtonWrapper>
        </ProfilePageContainer>
    );
}

export default ProfilePage;
