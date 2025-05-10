import React from 'react';
import useData from "../GlobalProvider/useData/useData";
import useStore from "../layout/useStore";


const Home = () => {
    // const {loginUser, accessToken} = useData();
    // console.log("accessToken",accessToken );
    // console.log("user", loginUser);
    const {
        data:{
            loginUser
        }} = useStore()

    // const {loginUser, accessToken} = useData()
    return (
        <div className="card">
            Hi! {loginUser?.name} <br/>
        </div>
    );
};

export default Home;