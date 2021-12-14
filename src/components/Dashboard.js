import React from 'react'
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import { fetchBuilds } from '../jenkins';

// Retrieve the Jenkins data from the browser's local storage and parse it into JSON format
const data = JSON.parse(localStorage.getItem('userData'));

const WidgetOne = () => <ul className="jobs">{data["jobs"].map((job, i) =>
    <li>
        <div className="job-name">
            <a href={job['url']} target="_blank" key={i} className="job-name">
                {job['name']}&nbsp;<img src='icons/expand.png' style={{ height: "2vh" }} />
            </a>
        </div>

        <ul className="builds">{fetchBuilds(job['name'])['builds'].reverse().map((build, j) =>
            <li><a href={build['url']} target="_blank" key={j}>Build n°{build['number']}</a></li>
        )}</ul>
    </li>
)}</ul>;
const WidgetTwo = () => <div>{data["numExecutors"]}</div>;

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
];

function Dashboard() {

    const [positions, setPositions] = useState(initialPositions);

    const widgets = [
        {
            header: "Jobs",
            body: <WidgetOne />,
        },
        {
            header: "Number of Executors",
            body: <WidgetTwo />,
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
