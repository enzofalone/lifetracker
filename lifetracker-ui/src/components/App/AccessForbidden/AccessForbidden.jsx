
export default function AccessForbidden(props) {
    return (
        <div className="access-forbidden content">
            <h1>{props.message || "You are not authorized to see this page"}</h1>
        </div>
    )
}