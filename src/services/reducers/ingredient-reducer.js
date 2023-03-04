//  Редьюсер для обработки действий с ингредиентами в redux store   //
//  Импортирую actions для ингредиентов  //
import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_OK,
  GET_INGREDIENTS_API_FAIL,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../actions/ingredient-actions';

//  Начальное состояние стора ингредиентов: пустой массив, нет запроса, нет ошибок  //
const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

//  Меняю состояние в сторе в зависимости от типа action: запрос, успех, ошибка  //
export const ingredientsReducer = (state = initialIngredientsState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_API_OK: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_API_FAIL: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};

//  Обнуленное начальное состояние стора инфо по ингредиенту  //
const initialIngredientDetailsState = {
  ingredientDetails: null,
};

//  Refactor: вынести редьюсер в отдельный файл  //
//  Редьюсер для обработки действий с деталями ингредиента в redux store (открыть/закрыть)  //
export const ingredientDetailsReducer = (
  state = initialIngredientDetailsState,
  action
) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload,
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
