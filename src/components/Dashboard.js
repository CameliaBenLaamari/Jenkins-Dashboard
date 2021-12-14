import React from 'react'
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';

// Retrieve the Jenkins data from the browser's local storage and parse it into JSON format
const data = JSON.parse(localStorage.getItem('userData'));
const data1 = [1, 2, 3, 5, 8, 13];
const data2=[1, 2, 3,6 ,10, 20];
    const ChartContainer = () => (
    <Chart>
        <ChartSeries>
        <ChartSeriesItem type="line" data={data1} name="Fibonacci" />
        <ChartSeriesItem type="line" data={data2} name="2" />
        </ChartSeries>
    </Chart>
    );



const WidgetOne = () => <div>Widget one</div>;
const WidgetTwo = () => <div>{data["numExecutors"]}</div>;
const WidgetThree = () => <div> <ChartContainer /></div>;



const initialPositions = [
    {
        col: 1,
        colSpan: 2,
        rowSpan: 2,
    },
    {
        col: 3,
        colSpan: 1,
        rowSpan: 1,
    },
    {
        col: 1,
        colSpan: 2,
        rowSpan: 2,
    },
];
 // Provide some sample data for the Chart
 
function Dashboard() {

    const [positions, setPositions] = useState(initialPositions);

    const widgets = [
        {
            header: "Widget one header",
            body: <WidgetOne />,
        },
        {
            header: "Widget two header",
            body: <WidgetTwo />,
        },
        {
            header: "Widget three header",
            body: <WidgetThree />,
        },
    ];

    const handleReposition = e => {
        setPositions(e.value);
    };
    
    return (
        <div id="dashboard">
            <h1>Jenkins Dashboard</h1>
            <h2>By Ameni Elhassen & Camelia Ben Laamari</h2>
            <TileLayout
                className="tileLayout"
                columns={4}
                rowHeight={255}
                gap={{ rows: 10, columns: 10 }}
                positions={positions}
                items={widgets}
                onReposition={handleReposition}
            />
            
        </div>
    )

}

export default Dashboard
