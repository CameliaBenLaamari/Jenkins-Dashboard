import './App.css';

function App() {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46YWRtaW4=");
  myHeaders.append("Cookie", "JSESSIONID=C86FD8403E865D0D94F4CBB79C232830");
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch("http://localhost:8081/jenkins/api/json", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return (
    <div></div>
  );
}

export default App;
