import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute:React.FC<{redirectPath?:string,children:any}> = ({redirectPath="/login",children}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('atkn'));
    if (!token) {
        return <Navigate to={redirectPath??'/login'} replace />
    }
    return children ? children : <Outlet />
}
export default ProtectedRoute;