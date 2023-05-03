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