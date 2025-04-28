import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectIsInit } from "../../slices/userSlice";
import { Preloader } from "@ui";
import { useSelector } from "../../services/store";
import React from "react";

type ProtectedRouteProps = {
    children: React.ReactElement;
    unAuthOnly?: boolean;
};

export const ProtectedRoute = ({ children, unAuthOnly }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isInit = useSelector(selectIsInit);
    const location = useLocation();

    if (!isInit) {
        return <Preloader />;
    }

    if (!unAuthOnly && !isAuthenticated) {
        return <Navigate replace to="/login" state={{ from: location }} />;
    }

    if (unAuthOnly && isAuthenticated) {
        const from = location.state?.from || { pathname: "/" };
        return <Navigate replace to={from} />;
    }

    return children;
};
