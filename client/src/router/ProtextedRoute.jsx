import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ children}) {
    if(!localStorage.getItem('accessToken')){
        return <Navigate to="/login"/>;
    }
    return ( 
        <Outlet/>
    );
}

export default ProtectedRoute;