import './App.css';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Sidebar from './Sidebar';

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

  fetch("http://localhost:8080/jenkins/api/json", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Sidebar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
