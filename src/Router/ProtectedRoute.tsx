import {Outlet, Navigate} from "react-router";
import useStore from "../layout/useStore";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const {data:{loginUser,setLoginUser,isLoggedIn,setIsLoggedIn}} = useStore()

    useEffect(() => {
        const stored = localStorage.getItem('loggedInUser');
        const log = localStorage.getItem('isLoggedIn');
        if (stored && log) {
            setLoginUser(JSON.parse(stored));
            setIsLoggedIn(JSON.parse(log));
            console.log(loginUser)
        }
    },[localStorage.getItem('loggedInUser')]);

    if (isLoggedIn && !loginUser?.name) return <div>Loading...</div>

    return loginUser ? <Outlet/> : <Navigate to="/signin"/>;
};

export default ProtectedRoute;