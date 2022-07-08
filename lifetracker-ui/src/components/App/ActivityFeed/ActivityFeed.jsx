import SummaryStat from "../SummaryStat/SummaryStat";
import './ActivityFeed.css'

export default function ActivityFeed(props) {
    return (
        <div className="activity-feed">
            <div className="per-category">
                <h4 className="stat-title">Average Calories Per Category</h4>
                <SummaryStat stat={Math.round(props?.avgCaloriesPerCategory?.calories)} label={'Calories'} substat={props?.avgCaloriesPerCategory?.category}/>
            </div>
            <div className="per-day">
                <h4 className="stat-title">Total Calories Per Day</h4>
                <div className="items">
                {props?.totalCaloriesPerDay?.length > 0 ? props?.totalCaloriesPerDay?.map(item => {
                    return(<SummaryStat stat={Math.round(item?.calories)} label={'Calories'} substat={item?.createdAt}/>)
                }) : <></>}
                </div>
                
            </div>
        </div>
    )
}