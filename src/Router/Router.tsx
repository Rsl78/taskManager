import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../layout/Layout";
import NotFound from "../NotFound/NotFound";
import Profile from "../Pages/Profile";
import Tasks from "../Pages/Tasks";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";




export const router: any = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path:"tasks",
                element:<Tasks/>
            }
        ],
    },
    {
        path: "signin",
        element: <SignIn/>
    },
    {
        path:"signup",
        element: <SignUp/>
    }
]);
