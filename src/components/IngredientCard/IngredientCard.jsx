//    //

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientCardStyles from './IngredientCard.module.css';

const IngredientCard = ({ data }) => {

//  console.log('IngrCard ', data);  //
  return (
    <div className={ingredientCardStyles.card}>
      <img src={data.image} alt={data.name} className={ingredientCardStyles.image}/>
      <p className={ingredientCardStyles.price}>
        {data.price}
        <CurrencyIcon type="secondary"/>
      </p>
      <p className={ingredientCardStyles.title}>
        {data.name}
      </p>
    </div>
  );
}

export default IngredientCard;