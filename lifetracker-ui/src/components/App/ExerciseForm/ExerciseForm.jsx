import ExerciseContext from "../../../contexts/exercise";
import { useContext, useState } from "react";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function ExerciseForm() {
    const navigate = useNavigate();
    const { exerciseContext } = useContext(ExerciseContext);
    const [exercises, setExercises] = exerciseContext;

    const formInit = {
        name: '',
        category: '',
        intensity: 1,
        duration: 1,
        image: ''
    }

    //useState hooks
    const [form, setForm] = useState(formInit);
    const [error, setError] = useState();

    const onFormChange = (event) => {
        setForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
        //reset error message as user is already making changes
        setError();
    }
    //
    const handleOnSubmit = async () => {
        const { data, error } = await apiClient.createExercise(form);
        if (error) {
            setError(error)
        } else {
            //set nutritions useState
            setExercises(data.exercises);
            //reset form
            setForm(formInit);
            //navigate to nutrition main page
            navigate('/exercise');
        }
    }

    return (
        <div className="exercise-form form">
            <h1>Record New Exercise</h1>
            <p style={{ color: 'red' }}>{error}</p>
            <label htmlFor='name'>Name</label>
            <input name="name" type={'text'} value={form.name} placeholder={'Pilates'} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Category</label>
            <input name="category" type={'text'} value={form.category} placeholder={'Abdominal'} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Intensity (1-10)</label>
            <input name="intensity" type={'number'} value={form.intensity} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Duration in minutes</label>
            <input name="duration" type={'number'} value={form.duration} onChange={(e) => onFormChange(e)} />
            <button onClick={(e) => handleOnSubmit()} className='submit-registration form-button'>Submit</button>
        </div>
    )
}