import { Navigate, Outlet } from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../Config/contexts";

function PrivateRoute(){
    const {user} = useContext(UserContext)
    console.log('User is ' + (user.isLoggedIn? 'logged in': 'not logged in'))
    return user.isLoggedIn ? <Outlet /> : <Navigate to="/login"/>;
}

export default PrivateRoute;