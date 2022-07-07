import { Navigate, NavLink } from "react-router-dom";

import './ActivityPage.css'

export default function ActivityPage(props) {
    // check if user is aunthenticated
    console.log(props.user);
    // !props.user.email && (<Navigate to='/login' replace={true} />)

    return (
        <div className="activity">
            <div className="content">
                <div className="headline">
                    <section>
                        {/* <h1>Activity Feed 💪</h1> */}
                        <h1>Welcome back, {props.user.firstName}</h1>
                    </section>
                    <section>
                        <NavLink to='/exercise/create' className="record-button" style={{ backgroundColor: '#8b0000' }}>Add Exercise</NavLink>
                        <NavLink to='/sleep/create' className="record-button" style={{ backgroundColor: '#013220' }}>Long Sleep</NavLink>
                        <NavLink to='/nutrition/create' className="record-button" style={{ backgroundColor: '#8B8000' }}>Record Nutrition</NavLink>
                    </section>
                </div>
                <div className="activity-body">
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