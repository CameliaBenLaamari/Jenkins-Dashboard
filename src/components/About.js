import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';

function About() {
    return (
        <div id="about">
            <Sidebar />
            <h1>About</h1>
            <p style={{ margin: "3vh 0 3vh 0", fontSize: "2.5vh" }}>This dashboard was developed by <strong>Ameni Elhassen</strong> and <strong>Camelia Ben Laamari</strong> using:</p>
            <div className="icon-grid">
                <img src="icons/react.svg" alt="react-logo" style={{ height: "4vh" }} />
                <img src="icons/material-ui.svg" alt="mui-logo" style={{ height: "5vh" }} />
                <img src="icons/firebase.svg" alt="firebase-logo" style={{ height: "5vh" }} />
                <img src="icons/telerik.svg" alt="telerik-logo" style={{ height: "4vh" }} />
            </div>
            <div className="icon-grid" style={{ width: "50vh", marginLeft: "35vh" }}>
                <img src="icons/tomcat.svg" alt="tomcat-logo" style={{ height: "5vh" }} />
                <img src="icons/jenkins.svg" alt="jenkins-logo" style={{ height: "5.5vh" }} />
            </div>
            <div className="icon-grid">
                <img src="icons/github.svg" alt="github-logo" style={{ height: "3vh" }} />
                <img src="icons/docker.svg" alt="docker-logo" style={{ height: "4vh" }} />
                <img src="icons/circleci.svg" alt="circleci-logo" style={{ height: "4vh" }} />
                <img src="icons/heroku.svg" alt="heroku-logo" style={{ height: "5vh" }} />
            </div>
            <Footer />
        </div>
    )
};

export default About;
