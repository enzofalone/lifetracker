import './ExerciseCard.css'
import {capitalize} from 'lodash';
import { Link } from 'react-router-dom';

export default function ExerciseCard(props) {
    // handle not valid image links by using placeholder

    return (
        <div className="exercise-card">
            <div className='exercise-card-body'>
                <span>{capitalize(props.name)}</span>
                <span className='card-description'>{capitalize(props.category)}</span>
                <span className='card-description'>Intensity: {props.intensity}</span>
                <span className='card-description'>{props.duration} minutes</span>
            </div>
        </div>
    )
}