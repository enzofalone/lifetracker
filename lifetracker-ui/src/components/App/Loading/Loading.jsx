export default function Loading(props) {
    return (
        <div className="loading">
            <div className='content'>
                <h1>{props.message || 'Loading...'}</h1>
            </div>
        </div>
    )
}

