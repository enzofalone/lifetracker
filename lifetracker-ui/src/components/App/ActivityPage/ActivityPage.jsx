import { Navigate } from "react-router-dom";

import './ActivityPage.css'

export default function ActivityPage(props) {
    // check if user is aunthenticated
    !props.auth.loggedIn && (<Navigate to='/login' replace={true} />)

    return (
        <div className="activity">
            <div className="content">
                <div className="headline">
                    <section>
                        <h1>Activity Feed 💪</h1>
                    </section>
                    <section>
                        <button className="form-button" style={{ backgroundColor: '#8b0000' }} >Add Excercise</button>
                        <button className="form-button" style={{ backgroundColor: '#013220' }}>Long Sleep</button>
                        <button className="form-button" style={{ backgroundColor: '#8B8000' }}>Record Nutrition</button>
                    </section>
                </div>
                <div className="body">
                    <div className="stat-container">

                    </div>
                    <div className="stat-container">
                        
                    </div>
                    <div className="stat-container">
                        
                    </div>
                </div>
            </div>
        </div>

    )
}