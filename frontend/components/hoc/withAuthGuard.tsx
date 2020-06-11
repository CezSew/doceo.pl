import React from "react";
import AuthGuard from "../pages/AuthGuard";

export const WithAuthGuard = (Component) => props => {
   return (
        <AuthGuard>
            <Component {...props}/>
        </AuthGuard>
    );
}
