import React from 'react';

interface summaryCardProps {
    title: string;
    count: number;
}
const SummaryCard = ({count, title}: summaryCardProps) => {
    return (
            <div className={"card flex w-full h-10rem flex-column justify-content-center align-items-center"}>
                <h3>{count}</h3>
                <h4>{title}</h4>
            </div>
    );
};

export default SummaryCard;