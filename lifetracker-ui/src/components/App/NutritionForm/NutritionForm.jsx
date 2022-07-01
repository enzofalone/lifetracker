import { useState } from 'react';
import apiClient from '../../../services/apiClient';

export default function NutritionForm(props) {
    const formInit = {
        name: '',
        category: '',
        quantity: 1,
        calories: 1,
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

    const handleOnSubmit = async () => {
        const { data, error } = await apiClient.createNutrition(form);
        if (error) setError(error);
        //set nutritions useState to render later in the NutritionsPage
        props.setNutrition(data.nutritions);

        //TODO: NAVIGATE TO NUTRITIONS PAGE AFTER REQUEST
    }

    return (
        <div className="nutrition-form form">
            <h1>Record Nutrition</h1>
            <p style={{ color: 'red' }}>{error}</p>
            <label htmlFor='name'>Name</label>
            <input name="name" type={'text'} value={form.name} placeholder={'Apple'} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Category</label>
            <input name="category" type={'text'} value={form.category} placeholder={'Fruit'} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Quantity</label>
            <input name="quantity" type={'number'} value={form.quantity} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Calories</label>
            <input name="calories" type={'number'} value={form.calories} onChange={(e) => onFormChange(e)} />
            <label htmlFor='name'>Image URL</label>
            <input name="image" type={'text'} value={form.image} placeholder={'https://img.taste.com.au/EnoUrlY0/taste/2016/11/bacon-cheddar-and-pineapple-pizza-77250-1.jpeg'} onChange={(e) => onFormChange(e)} />
            <button onClick={(e) => handleOnSubmit()} className='submit-registration form-button'>Submit</button>
        </div>
    )
}