import React, { useEffect } from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartTitle } from '@progress/kendo-react-charts';
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import { auth, getJenkins, getUser, getCustomWidgets } from '../firebase';
import 'hammerjs';
import AddWidget from './AddWidget';
import ListJobs from './ListJobs';
import { useReducer } from 'react';

function Dashboard() {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [jobs, setJobs] = useState({});
    /*const [customItems, setCustomItems] = useState([]);
    const [customPositions, setCustomPositions] = useState([]);*/

    useEffect(() => {
        async function getData(uid) {
            getUser(uid).then((result) => {
                setUser(result);
            })
            getJenkins(uid).then((result) => {
                setData(result['data']);
                setJobs(result['jobs']);
            })
            /*getCustomWidgets(uid).then((result) => {
                setCustomItems(result['items']);
                setCustomPositions(result['positions']);
            })*/
        }
        getData(auth.currentUser.uid);
    }, []);

    console.log("data", data);
    console.log("jobs", jobs);

    let durations = [];
    let estimatedDurations = [];
    if (jobs) {
        for (let i = 0; i < jobs.length; i++) {
            durations.push([]);
            estimatedDurations.push([]);
            for (let j = 0; j < jobs[i]['builds'].length; j++) {
                durations[i].push((jobs[i]['builds'][j]['duration']));
                estimatedDurations[i].push((jobs[i]['builds'][j]['estimatedDuration']));
            }
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
    const buildStatus = builds.map(x => Object.keys(x).map(key => key = x[key]['result']))
        .map(item =>
            item = [{
                "kind": "SUCCESS",
                "share": item.filter(x => x === "SUCCESS").length / item.length
            },
            {
                "kind": "FAILURE",
                "share": item.filter(x => x === "FAILURE").length / item.length
            }]
        )

    const DurationWidget = () => <div className="piecharts">
        {
            buildStatus.map((job, i) =>
                <Chart style={{ height: "25vh" }}>
                    <ChartTitle text={jobNames[i]} id="job-name" />
                    <ChartSeries style={{ background: "none" }}>
                        <ChartSeriesItem
                            type="donut"
                            data={job}
                            categoryField="kind"
                            field="share"
                            background="none"
                        >
                        </ChartSeriesItem>
                    </ChartSeries>
                    <ChartLegend visible={true} />
                </Chart>
            )
        }
    </div>;

    var items = [
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
            header: "Builds success rate",
            body: <DurationWidget />
        },
        {
            header: "GitHub Repo",
            body: <a href="https://github.com/PipelineAI/pipeline" target="_blank" rel="norefferer"><img src="https://gh-card.dev/repos/PipelineAI/pipeline.svg" alt="github-embed" style={{ marginTop: "3vh" }} /></a>
        },
        {
            header: "Reddit Thread",
            body: <iframe id="reddit-embed" src="https://www.redditmedia.com/r/devops/comments/nqjbse/how_to_perform_cicd_in_mobile_development/?ref_source=embed&amp;ref=share&amp;embed=true" sandbox="allow-scripts allow-same-origin allow-popups" style={{ border: 'none' }} height="420vh" width="550vh" scrolling="yes"></iframe>
        }
    ];

    var items2 = [
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
            header: "Builds success rate",
            body: <DurationWidget />
        },
        {
            header: "Add a widget",
            body: <AddWidget />
        }
    ];

    //const [items, setItems] = useState(initialItems);

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
            rowSpan: 1
        },
        {
            col: 3,
            colSpan: 2,
            rowSpan: 1
        },
        {
            col: 1,
            colSpan: 2,
            rowSpan: 2
        },
        {
            col: 3,
            colSpan: 1,
            rowSpan: 1
        }
    ];

    const initialPositions2 = [
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
            rowSpan: 1
        },
        {
            col: 3,
            colSpan: 1,
            rowSpan: 1
        }
    ];

    const [positions, setPositions] = useState((auth.currentUser.uid === "THxDQIjeiAPOMYby4SUZjS6jDKF2") ? initialPositions : initialPositions2);

    /*useEffect(() => {

        async function update(customItems, customPositions) {

            for (let i = 0; i < customItems.length; i++) {
                const url = customItems[i]['body'].toString();
                if (customItems[i]['header'] === "GitHub Repo") {
                    const repo = url.slice(19);
                    if (repo) {
                        const thumbnail = "https://gh-card.dev/repos/" + repo + ".svg";
                        items.push({
                            header: "GitHub Repo",
                            body: <a href={repo} target="_blank" rel="norefferer"><img src={thumbnail} alt="github-embed" style={{ marginTop: "3vh" }} /></a>
                        })
                    }
                } else {
                    const thread = url.slice(23);
                    if (thread) {
                        const thumbnail = "https://www.redditmedia.com/" + thread + "?ref_source=embed&amp;ref=share&amp;embed=true";
                        items.push({
                            header: "Reddit Thread",
                            body: <iframe id="reddit-embed" src={thumbnail} sandbox="allow-scripts allow-same-origin allow-popups" style={{ border: 'none' }} height="420vh" width="550vh" scrolling="yes"></iframe>
                        })
                    }
                }
            }
            setPositions(prevState => [...prevState, ...customPositions]);
        }

        update(customItems, customPositions);

        setPositions(prevState => [...prevState, {
            col: 3,
            colSpan: 1,
            rowSpan: 1
        }]);

    }, [])*/

    items.push({
        header: "Add a widget",
        body: <AddWidget />
    })

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
                items={(auth.currentUser.uid === "THxDQIjeiAPOMYby4SUZjS6jDKF2") ? items : items2}
                onReposition={handleReposition}
            />
        </div>
    )
}

export default Dashboard;
