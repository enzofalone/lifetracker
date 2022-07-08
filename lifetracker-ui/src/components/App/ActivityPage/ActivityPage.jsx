import ActivityContext from "../../../contexts/activity";
import { capitalize } from "lodash";
import { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import ActivityFeed from "../ActivityFeed/ActivityFeed";

import './ActivityPage.css'

export default function ActivityPage(props) {
    const { activityContext } = useContext(ActivityContext);
    const [ activity, setActivity ] = activityContext;

    

    return (
        <div className="activity-page">
            {!props.user.email && (<Navigate to='/forbidden' replace={true} />)}
            <div className="content">
                <div className="headline">
                    <section>
                        {/* <h1>Activity Feed 💪</h1> */}
                        <h1>Welcome back, {capitalize(props.user.firstName)}</h1>
                    </section>
                    <section>
                        <NavLink to='/exercise/create' className="record-button" style={{ backgroundColor: '#8b0000' }}>Add Exercise</NavLink>
                        <NavLink to='/sleep/create' className="record-button" style={{ backgroundColor: '#013220' }}>Long Sleep</NavLink>
                        <NavLink to='/nutrition/create' className="record-button" style={{ backgroundColor: '#8B8000' }}>Record Nutrition</NavLink>
                    </section>
                </div>
            </div>
            <ActivityFeed avgCaloriesPerCategory={activity.avgCaloriesPerCategory} totalCaloriesPerDay={activity.totalCaloriesPerDay}/>

        </div>

    )
}