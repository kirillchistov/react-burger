// /* eslint-disable cypress/unsafe-to-chain-command */
// //  Проверяем, что ингредиенты добавляются или заменяются (булки)  //
// //  Добавил референс для типизации cy  //
// /// <reference types="cypress" />
// // @ts-check
// describe('Добавление ингредиента или замена булки', () => {
  
//   before(() => {
//     cy.visit('http://localhost:3005');
//   });
  
//   it('Добавляет начинку в бургер', () => {
//     cy.get('[class^=burger-ingredients_ingredient_types__]').find('li').as('elementsList');
//     cy.get('@elementsList').eq(3).as('thirdElement');

//     cy.get('[class^=burger-constructor_element__container__]').first().as('burgerConstructor');
//     cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

//     cy.get('@thirdElement').trigger('dragstart').trigger('dragleave');
//     cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');
//   });

//   it('Замена', () => {
//     cy.get('[class^=burger-constructor_element__list]').find('li').as('elementsList');
//     cy.get('@elementsList').eq(3).as('thirdElement');
//     cy.get('@elementsList').last().as('lastElement');

//     cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
//     cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');
//     //
//     cy.get('@lastElement').trigger('dragstart').trigger('dragleave');
//     cy.get('@burgerConstructor')
//       .find('[class^=burger-constructor_replaceIcon__]')
//       .trigger('dragenter')
//       .trigger('dragover')
//       .trigger('drop');
//     // проверка текста замененного элемента
//     cy.get('@middle').then(($el) => {
//       cy.get($el).find('.constructor-element').should('have.length', 1);
//       cy.get('@lastElement')
//         .find('p')
//         .last()
//         .then(($ingredientName) => {
//           const textIngredient = $ingredientName.text();
//           cy.get($el).find('.constructor-element__text').should('have.text', textIngredient);
//         });
//     });
//   });
// });
export {}