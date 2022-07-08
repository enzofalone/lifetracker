import './NutritionCard.css'
import {capitalize} from 'lodash';
import placeholderImage from '../../../../res/placeholder2.png'
import { Link } from 'react-router-dom';

export default function NutritionCard(props) {
    // handle not valid image links by using placeholder
    const onImgError = (e) => {
        e.target.src = placeholderImage;
    }

    return (
        <div className="nutrition-card">
            <img src={props.image} onError={onImgError}/>
            <div className='nutrition-card-body'>
                <span>{capitalize(props.name)}</span>
                <span className='card-description'>{capitalize(props.category)}</span>
                <span className='card-description'>Amount: {props.quantity}</span>
                <span className='card-description'>{props.calories} calories</span>
            </div>
        </div>
    )
}