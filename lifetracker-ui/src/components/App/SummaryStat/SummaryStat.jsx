import './SummaryStat.css'

export default function SummaryStat(props) {
    return (
        <div className="summary-stat">
            
            <span className="stat-label stat">{props.label}</span>
            <span className='primary-statistic stat'>{props.stat || 0}</span>
            <span className="secondary-statistic stat">{props.substat}</span>

        </div>
    )
}