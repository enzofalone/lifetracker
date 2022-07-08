export default function NotFound(props) {
    return(
        <div className="not-found content">
            <h1 style={{color:'red'}}>{props.message || "Path requested is not found"}</h1>
        </div>
    )
}