import { setJenkins } from "./firebase";

var myHeaders = new Headers();

function configureHeaders(username, password) {
    // Login using the basic Auth credentials
    myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
    myHeaders.append("Content-Type", "application/json");
}

export async function fetchData(uid, jenkinsUsername, jenkinsPassword) {

    configureHeaders(jenkinsUsername, jenkinsPassword);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    function fetchJobs(job) {
        const data = fetch("http://localhost:8080/jenkins/job/" + job['name'] + "/api/json", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
        return data;
    }

    function fetchBuilds(build) {
        const data = fetch(build['url'] + "/api/json", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            });
        return data;
    }

    const data = await fetch("http://localhost:8080/jenkins/api/json", requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        });
    console.log("data", data);

    let jobs = data['jobs'];
    for (let i = 0; i < jobs.length; i++) {
        jobs[i] = await fetchJobs(jobs[i]);
        console.log("job" + i, jobs[i]);
        for (let j = 0; j < jobs[i]['builds'].length; j++) {
            jobs[i]['builds'][j] = await fetchBuilds(jobs[i]['builds'][j]);
            console.log("job" + i + "/build" + j, jobs[i]['builds'][j]);
        }
    }
    console.log(jobs);

    setJenkins(uid, data, jobs);
}