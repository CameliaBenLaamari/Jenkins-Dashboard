import React, { useEffect } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import { Chart, ChartCategoryAxis, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { auth, getJenkins } from '../firebase';
import 'hammerjs';

function Dashboard() {

    const [data, setData] = useState({});
    const [jobs, setJobs] = useState({});

    useEffect(() => {
        async function getData(uid) {
            getJenkins(uid).then((result) => {
                setData(result['data']);
                setJobs(result['jobs']);
            });
        }
        getData(auth.currentUser.uid);
    }, []);

    // Retrieve the Jenkins data from the browser's local storage and parse it into JSON format
    let durations = [];
    let estimatedDurations = [];
    for (let i = 0; i < jobs.length; i++) {
        durations.push([]);
        estimatedDurations.push([]);
        for (let j = 0; j < jobs[i]['builds'].length; j++) {
            durations[i].push((jobs[i]['builds'][j]['duration']));
            estimatedDurations[i].push((jobs[i]['builds'][j]['estimatedDuration']));
        }
    }

    const initialPositions = [
        {
            col: 1,
            colSpan: 1,
            rowSpan: 2
        },
        {
            col: 1,
            colSpan: 1,
            rowSpan: 1
        },
        {
            col: 2,
            colSpan: 3,
            rowSpan: 2
        },
        {
            col: 3,
            colSpan: 2,
            rowSpan: 1
        }
    ];

    const [positions, setPositions] = useState(initialPositions);

    const ChartContainer = () => (
        <Chart>
            <ChartSeries>
                {durations.map((job, i) =>
                    <ChartSeriesItem type="line" data={job} name={jobs[i]['displayName']} tooltip={{ visible: true }} />
                )}
            </ChartSeries>
        </Chart>
    );

    const WidgetOne = () => <div>
        {<ul className="jobs">
            {Object.keys(jobs).map((key) =>
                <li key={key} className="job">
                    <p id='job-name'>{jobs[key]['displayName']}</p>
                    <div className="builds">
                        {Object.keys(jobs[key]['builds']).map(i =>
                            <p key={i}>Build n°{parseInt(i) + 1}<br /></p>
                        )}
                    </div>
                </li>
            )}
        </ul>}
        <br />
    </div>;

    const WidgetTwo = () => <div style={{ textAlign: "left", padding: "2vh" }}>
        <p><strong>Number of executors: </strong>{data["numExecutors"]}</p>
        <p><strong>Mode: </strong>{data["mode"]}</p>
        <p><strong>Slave agent port: </strong>{data["slaveAgentPort"]}</p>
        <p><strong>URL: </strong><a href={data["url"]} target="_blank">{data["url"]}</a></p>
    </div>;

    const WidgetThree = () => <div><ChartContainer /></div>;

    const CustomWidget = () => <a href="https://github.com/PipelineAI/pipeline">
        <img src="https://gh-card.dev/repos/PipelineAI/pipeline.svg?fullname=" alt="git-repo" style={{ height: "17vh", marginTop: "2vh" }} />
    </a>

    const widgets = [
        {
            header: "Jobs",
            body: <WidgetOne />
        },
        {
            header: "Statistics",
            body: <WidgetTwo />
        },
        {
            header: "Builds duration (ms)",
            body: <WidgetThree />
        },
        {
            header: "Add a widget",
            body: <CustomWidget />
        }
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
