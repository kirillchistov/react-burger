import { expect } from '@jest/globals';
import { ingredientsReducer, initialIngredientsState } from './ingredient-reducer';

import { GET_INGREDIENTS_API, GET_INGREDIENTS_API_OK, GET_INGREDIENTS_API_FAIL } from "../../utils/constants";
import { INGREDIENT_MAIN, INGREDIENT_SAUCE } from "../../utils/testdata";

describe("ingredientsReducer", () => {
  it("should return initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialIngredientsState);
  });

  it("should handle GET_INGREDIENTS_API", () => {
    expect(
      ingredientsReducer(initialIngredientsState, {
        type: GET_INGREDIENTS_API,
      })
    ).toEqual({ ...initialIngredientsState, itemsRequest: true });
  });

  it("should handle GET_INGREDIENTS_API_OK", () => {
    expect(
      ingredientsReducer(initialIngredientsState, {
        type: GET_INGREDIENTS_API_OK,
        items: [INGREDIENT_SAUCE, INGREDIENT_MAIN],
      })
    ).toEqual({ ...initialIngredientsState, items: [INGREDIENT_SAUCE, INGREDIENT_MAIN] });
  });

  it("should handle GET_INGREDIENTS_API_FAIL", () => {
    expect(
      ingredientsReducer(initialIngredientsState, {
        type: GET_INGREDIENTS_API_FAIL,
      })
    ).toEqual({ ...initialIngredientsState, itemsFailed: true, itemsRequest: false });
  });

});