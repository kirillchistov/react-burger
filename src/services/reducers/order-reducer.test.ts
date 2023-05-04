import { expect } from '@jest/globals';
import { orderReducer, initialOrderState } from './order-reducer';
// import { orderActions } from '../../types';

import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  // POST_ORDER_API,
  // POST_ORDER_API_OK,
  // POST_ORDER_API_FAIL,
  // DELETE_ORDER
} from '../../utils/constants';
// import { TOrderActions } from '../actions/order-actions';
// import { TIngredient } from '../types/index'
import { ORDER, ORDER_SORTED, INGREDIENT_SAUCE, CARD_BUN } from '../../utils/testdata';
// import { WSORDERDATA, INGREDIENT_MAIN } from '../../utils/testdata';

describe('orderReducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialOrderState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      orderReducer(initialOrderState, {  
        type: ADD_INGREDIENT,
        payload: INGREDIENT_SAUCE,
      })
    ).toEqual({
      ...initialOrderState,
      burgerData: [...initialOrderState.burgerData, INGREDIENT_SAUCE],
    });
  });
 
  it('should handle REMOVE_INGREDIENT', () => {
    expect(
      orderReducer(initialOrderState, {
        type: REMOVE_INGREDIENT,
        payload: 'test',
      })
    ).toEqual({
      ...initialOrderState,
      burgerData: initialOrderState.burgerData.filter(
        (item) => item._uid !== 'test'
      ),
    });
  });

  it('should handle MOVE_INGREDIENT', () => {
    expect(
      orderReducer({ ...initialOrderState, burgerData: ORDER.order.ingredients }, {
        type: MOVE_INGREDIENT,
        payload: {whichIngredientDroppedUid:'3', onWhichIngredientDroppedUid:'2'},
      })
    ).toEqual({
      ...initialOrderState,
      burgerData: ORDER_SORTED.order.ingredients,
    });
  });

  it('should handle ADD_BUN', () => {
    expect(
      orderReducer(initialOrderState, {
        type: ADD_BUN,
        payload: CARD_BUN,
      })
    ).toEqual({
      ...initialOrderState,
      burgerData: [CARD_BUN],
    });
  });
});
