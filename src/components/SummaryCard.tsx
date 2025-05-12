import React from 'react';
import useStore from "../layout/useStore";
import {Task} from "../../types/task";

const SummaryCard = () => {
    const {data:{allTasks}} = useStore();
    const totalTask = allTasks.length;
    const completedTask = allTasks.filter((task: Task)=> task.status === "COMPLETED").length;
    const inCompleteTask = totalTask- completedTask;

    const stringifyData = localStorage.getItem("users");
    const parsedData = stringifyData ? JSON.parse(stringifyData) : [];
    const totalUser = parsedData.length;


    return (
        <div className={"card flex flex-column justify-content-center  h-30rem w-30rem  "}>
            <h3 className={" underline font-light"}>Tasks Summary</h3>

            <div>
                <h6>Total user: {totalUser}</h6>
                <h6>Total Task: {totalTask} </h6>
                <h6>Total Completed Task: {completedTask}</h6>
                <h6>Total Incomplete Task: {inCompleteTask} </h6>
            </div>
        </div>
    );
};

export default SummaryCard;