import React from 'react';
import {  Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = React.useContext(UserContext);

    return user.isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
