import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface Props {
    PassedLabel: string[];
    PassedData: number[];
}

export default function PieChart({ PassedLabel, PassedData }: Props) {
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
            <div>
                <Chart type="pie" data={chartData} options={chartOptions} className="card w-30rem h-30rem" />
                <h2>Title</h2>
            </div>
    );
}