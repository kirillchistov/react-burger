/* eslint-disable cypress/unsafe-to-chain-command */
//  Проверяем, что ингредиенты добавляются или заменяются (булки)  //
//  Добавил референс для типизации cy  //
/// <reference types="cypress" />
// @ts-check
describe('Добавление ингредиента или замена булки', () => {
  
  before(() => {
    cy.visit('http://localhost:3005');
  });
  
  it('Добавляет начинку в бургер', () => {
    cy.get('[class^=burger-ingredients_ingredient_types__]').find('div').as('elementsList');
    cy.get('@elementsList').eq(3).as('thirdElement');

    cy.get('[class^=burger-constructor_element__container__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

    cy.get('@thirdElement').trigger('dragstart').trigger('dragleave');
    cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');
  });
});
