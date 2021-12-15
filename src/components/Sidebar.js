import React from 'react'

function Sidebar() {
    return (
        <div id="sidebar">
            <div className="column">
                <img src="jenkins.png" alt="Jenkins Logo" className="sidebar-logo" />
                <ul>
                    <li><img src="icons/accueil.png" alt="home" style={{ height: '3.4vh' }}></img></li>
                    <li><img src="icons/info.png" alt="about" style={{ height: '3.4vh' }}></img></li>
                    <li><img src="icons/user.png" alt="account" style={{ height: '3.4vh' }}></img></li>
                    <li><img src="icons/setting.png" alt="settings" style={{ height: '3.4vh' }}></img></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
