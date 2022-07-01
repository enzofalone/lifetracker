import './NutritionCard.css'

export default function NutritionCard(props) {
    return (
        <div className="nutrition-card">
            <img src={props.image}/>
            <div className='nutrition-card-body'>
                <span>{props.name}</span>
                <span>{props.category}</span>
                <span>{props.quantity}</span>
            </div>
        </div>
    )
}