import React, { useEffect } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import { auth, getJenkins, getUser } from '../firebase';
import 'hammerjs';
import AddWidget from './AddWidget';
import ListJobs from './ListJobs';

function Dashboard() {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [jobs, setJobs] = useState({});

    useEffect(() => {
        async function getData(uid) {
            getUser(uid).then((result) => {
                setUser(result);
            })
            getJenkins(uid).then((result) => {
                setData(result['data']);
                setJobs(result['jobs']);
            })
        }
        getData(auth.currentUser.uid);
    }, []);

    const initialPositions = [
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
            col: 1,
            colSpan: 1,
            rowSpan: 1
        },
        {
            col: 1,
            colSpan: 2,
            rowSpan: 2
        },
        {
            col: 3,
            colSpan: 2,
            rowSpan: 1
        },
        {
            col: 3,
            colSpan: 1,
            rowSpan: 1
        }
    ];

    const [positions, setPositions] = useState(initialPositions);

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

    const ChartContainer = () => (
        <Chart>
            <ChartSeries>
                {durations.map((job, i) =>
                    <ChartSeriesItem type="line" data={job} name={jobs[i]['displayName']} tooltip={{ visible: true }} />
                )}
            </ChartSeries>
        </Chart>
    );

    const JobsWidget = () => <div id="joblist"><ListJobs /></div>

    const StatsWidget = () => <div style={{ textAlign: "left", padding: "2vh" }}>
        <p><strong>Number of executors: </strong>{data["numExecutors"]}</p>
        <p><strong>Mode: </strong>{data["mode"]}</p>
        <p><strong>Slave agent port: </strong>{data["slaveAgentPort"]}</p>
        <p><strong>URL: </strong><a href={data["url"]} target="_blank">{data["url"]}</a></p>
    </div>;

    const BuildsWidget = () => <div><ChartContainer /></div>;

    const jobNames = Object.keys(jobs).map(key => key = jobs[key]['displayName']);
    const builds = Object.keys(jobs).map(key => key = jobs[key]['builds']);
    const buildStatus = builds.map(x => Object.keys(x).map(key => key = (x[key]['result'] === 'SUCCESS') ? 1 : 0));
    console.log(buildStatus);

    const DurationWidget = () => <Chart>
        <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={jobNames} type="column"></ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
            {buildStatus.map((item, i) =>
                <ChartSeriesItem key={i} data={item} name={jobNames[i]}></ChartSeriesItem>
            )}
        </ChartSeries>
    </Chart>;

    const items = [
        {
            header: "Statistics",
            body: <StatsWidget />
        },
        {
            header: "Builds duration (ms)",
            body: <BuildsWidget />
        },
        {
            header: "Jobs",
            body: <JobsWidget />
        },
        {
            header: "Successful builds ratio",
            body: <DurationWidget />
        },
        {
            header: "Add a widget",
            body: <AddWidget />
        }
    ];


    const handleReposition = e => {
        setPositions(e.value);
    };

    return (
        <div id="dashboard">
            <div className='header'>
                <div>
                    <h1>Jenkins Dashboard</h1>
                    <h2>By Ameni Elhassen & Camelia Ben Laamari</h2>
                </div>
                <div style={{ fontSize: "3vh" }}>Hello <strong>{user['username']}</strong>!</div>
            </div>
            <TileLayout
                className="tileLayout"
                columns={4}
                rowHeight={255}
                gap={{ rows: 10, columns: 10 }}
                positions={positions}
                items={items}
                onReposition={handleReposition}
            />
        </div>
    )

}

export default Dashboard
