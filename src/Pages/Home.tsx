import React from 'react';
import useData from "../GlobalProvider/useData/useData";
import useStore from "../layout/useStore";
import PieChart from "../components/PieChart";


const Home = () => {
    const {
        data:{
            loginUser
        }} = useStore()

    // const {loginUser, accessToken} = useData()
    return (
        <div className="card">
            {/*Hi! {loginUser?.name} <br/>*/}
            <PieChart PassedLabel={['A', 'B', 'C']} PassedData={[10,20,30]}/>
        </div>
    );
};

export default Home;