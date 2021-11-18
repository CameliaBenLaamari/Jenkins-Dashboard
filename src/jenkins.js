var myHeaders = new Headers();

function fetchData(username, password) {

    // Login using the basic Auth credentials
    myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
    myHeaders.append("Cookie", "JSESSIONID=C86FD8403E865D0D94F4CBB79C232830");
    myHeaders.append("Content-Type", "application/json");

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

export default fetchData