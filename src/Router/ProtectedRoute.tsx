import {Outlet, Navigate} from "react-router";
import useStore from "../layout/useStore";

const ProtectedRoute = () => {

    const {data:{loginUser}} = useStore()

    return loginUser ? <Outlet/> : <Navigate to="/signin" replace/>;
};

export default ProtectedRoute;