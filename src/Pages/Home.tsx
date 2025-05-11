import React from 'react';
// import useData from "../GlobalProvider/useData/useData";
import useStore from "../layout/useStore";
import PieChart from "../components/PieChart";
import {Task} from "../../types/task";


const Home = () => {
    const {data:{allTasks}} = useStore()
    console.log(allTasks)

    const statusCounts = allTasks.reduce((acc: Record<string, number>, task: Task) => {
        const status = task.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const priorityCounts = allTasks.reduce((acc: Record<string, number>, task: Task) => {
        const priority = task.priority?? 'Unknown';
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="card ">
            <div className={"flex justify-content-between"}>
                <PieChart PassedLabel={Object.keys(statusCounts)} PassedData={(Object.values(statusCounts))}/>
                <PieChart PassedLabel={Object.keys(priorityCounts)} PassedData={(Object.values(priorityCounts))}/>
            </div>
        </div>
    );
};

export default Home;