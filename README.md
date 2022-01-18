# Jenkins Dashboard
<br/>

## Requirements
- Jenkins installed on Apache Tomcat. See [here](https://wiki.jenkins.io/JENKINS/Tomcat.html).
- Xampp or Powershell to start Tomcat
- Node.js
<br/>

## Steps
### Run the app locally
1- Clone the repo on a local machine using ```git clone https://github.com/CameliaBenLaamari/Jenkins-Dashboard.git```

2- Start Apache Tomcat on Xampp or through the CLI and make sure Jenkins is listening to http://localhost:8080/jenkins/.

3- Make sure Jenkins is set up and that a user is created.

4- In the cloned app directory, run ```npm start``` to launch the app on http://localhost:3000/.

5- The Jenkins username and password provided in the registration form must be those of the local Jenkins account, otherwise it wouldn't work.
> :warning: Multiple users on the same machine using the same Jenkins username and password will get the same Jenkins data, as it's being displayed using Jenkins Remote Access API.
<br/>

### Run the deployed app on Heroku
The app can be found on https://jenkins-dashboard-app.herokuapp.com/.

> :warning: The app is currently **under maintenance** on Heroku, due to free plan limits exceeding.
<br/>

## Authors
By:
- Camelia Ben Laamari
- Ameni Elhassen

Tutored by:
- Pr. Zied Choukair

<br/><br/><br/>
© INDP3 SNI 2021-2022. SUP'COM.
