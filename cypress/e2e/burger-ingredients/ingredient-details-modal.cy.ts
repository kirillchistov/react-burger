// describe('Открытие и закрытие попапа с деталями ингредиента', function () {
//   before(function () {
//     cy.visit('http://localhost:3005');
//   });
//   it('Открытие попапа', function () {
//     cy.get('[class^=burger-ingredients_ingredient_types__]').find('li').first().as('ingredient');
//     cy.get('@ingredient')
//       .click()
//       .then(($ingredient) => {
//         cy.get($ingredient)
//           .find('p')
//           .last()
//           .then(($name) => {
//             const name = $name.text();
//             cy.get('[class^=ingredient-details_modal__]').find('.name').should('have.text', name);
//           });
//       });
//   });
//   it('Закрытие попапа', () => {
//     cy.get('[class^=modal_container__]').find('[class^=modal_close__]').click();
//     cy.get('#react-modals').find('div').should('have.length', 0);
//   });
// });
/* eslint-disable cypress/unsafe-to-chain-command */
//  Отключил предупреждения линтера  //
//  Проверяем, что ингредиенты перетаскиваются, заказ считается, кнопка срабатывает  //
//  Добавил референс для типизации cy  //

/// <reference types="cypress" />
// @ts-check
//  импортирую команду для тестирования DnD  //
//  refactor: переписать на data-test-id  //
import "@4tw/cypress-drag-drop";

describe("Работает конструктор заказа бургера", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("содержит заголовок Соберите бургер", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("содержит ингредиент, открывает и закрывает попап", () => {
    cy.get("[class^=ingredient-item_ingredient]").first().as("ingredient");
    cy.get("@ingredient").click();
    cy.get("[class^=modal_container__]").as("modal");
    cy.get("@modal").find("p").contains("Детали ингредиента");
    cy.get("@modal").find("svg").click();
  });
});