import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface Props {
    PassedLabel: string[];
    PassedData: number[];
    Title: string,
}

export default function PieChart({ PassedLabel, PassedData,Title }: Props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: PassedLabel,
            datasets: [
                {
                    data: PassedData,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-500')
                    ]
                }
            ]
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [PassedLabel, PassedData]);

    return (
            <div className={"flex flex-column card flex align-items-center justify-content-center w-30rem h-30rem "}>
                <Chart type="pie" data={chartData} options={chartOptions} className=" w-25rem h-25rem" />
                <h6 className={"text-center"}>{Title}</h6>
            </div>
    );
}