import React from 'react';
// import useStore from "../layout/useStore";
// import {Task} from "../../types/task";

interface summaryCardProps {
    title: string;
    count: number;
}

const SummaryCard = (summaryProps: summaryCardProps) => {
    // const {data: {allTasks}} = useStore();


    return (

            <div className={"card flex w-full h-10rem flex-column justify-content-center align-items-center"}>
                <h3>{summaryProps.count}</h3>
                <h4>{summaryProps.title}</h4>
            </div>

    );
};

export default SummaryCard;