import AuthContext from '../../../contexts/auth';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import apiClient from '../../../services/apiClient';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import './NutritionDetail.css'
import NutritionCard from '../NutritionCard/NutritionCard';

export default function NutritionDetail() {
  const { userContext } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState();
  const [nutritionItem, setNutritionItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { nutritionId } = useParams();

  useEffect(() => {

    const fetchNutrition = async () => {
      setIsLoading(true)
      
      const { data, error } = await apiClient.fetchNutritionById(nutritionId)

      console.log("fetched by id:", nutritionId, " ->", data);

      if (data) {
        setNutritionItem(data);
      } else {
        setErrorMessage(error);
      }

      setIsLoading(false)
    }

    fetchNutrition();
  }, []);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  if (errorMessage) {
    return (
      <NotFound message={errorMessage}/>
    )
  }

  return (
    <div className='nutrition-detail content'>
      <NutritionCard
              id={nutritionItem.id}
              key={nutritionItem.id}
              name={nutritionItem.name}
              category={nutritionItem.category}
              calories={nutritionItem.calories}
              quantity={nutritionItem.quantity}
              image={nutritionItem.image} />
    </div>
  )
}