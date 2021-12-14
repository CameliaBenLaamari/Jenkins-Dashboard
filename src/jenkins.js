var myHeaders = new Headers();

export default function configureHeaders(username, password) {
    // Login using the basic Auth credentials
    myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
    myHeaders.append("Content-Type", "application/json");
}

export function fetchData(username, password) {

    configureHeaders(username, password)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch("http://localhost:8080/jenkins/api/json", requestOptions)
        .then(response => response.json())
        .then(result => {
            // Store the data fetched by the Jenkins API into the browser's local storage
            localStorage.setItem('userData', JSON.stringify(result));
        })
        .catch(error => console.log('error', error));

}

export function fetchBuilds(jobName) {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/jenkins/job/" + jobName + "/api/json", requestOptions)
        .then(response => response.json())
        .then(result => {
            // Store the data fetched by the Jenkins API into the browser's local storage
            localStorage.setItem(jobName, JSON.stringify(result));
        })
        .catch(error => console.log('error', error));

    return JSON.parse(localStorage.getItem(jobName));

}