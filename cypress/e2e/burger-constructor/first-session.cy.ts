/* eslint-disable cypress/unsafe-to-chain-command */
//  Отключил предупреждения линтера  //
//  Проверяем, что ингредиенты кликаются и перетаскиваются  //
//  Добавил референс для типизации cy  //

/// <reference types="cypress" />
// @ts-check
//  импортирую команду для тестирования DnD  //
//  refactor: переписать на data-test-id  //
import "@4tw/cypress-drag-drop";

describe("Работает DnD", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("содержит заголовок Соберите бургер и ингредиенты", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("список ингредиентов содержит булки", () => {
    cy.get("[class^=ingredient-item_ingredient]").first().as("firstBun");
    cy.get("@firstBun").contains("булка").should('exist');
    cy.get("[class^=ingredient-item_ingredient]").eq(1).as("secondBun");
    cy.get("@secondBun").contains("булка").should('exist');
  });

  it("Кнопка заказа не активна, если конструктор пуст", () => {
    cy.get("span").contains("Добавьте ингредиенты для Вашего бургера!");
    // cy.get("[class^=button button_type_primary]").first().as("orderButton");
    cy.get('[id^=orderButton]').should('not.exist');;
    // cy.get("@orderButton").should("be.disabled");
  });

 it("Работает DnD, замена, появляется тотал и кнопка", () => {
    cy.get("[class^=ingredient-item_ingredient]").as("ingredient");
    cy.get("[class^=burger-constructor_element__list__]").as("elementList");    
    cy.get("@ingredient").eq(0).drag("@elementList");
    cy.get("@ingredient").eq(3).drag("@elementList");
    cy.get("@ingredient").eq(11).drag("@elementList");
    cy.get("@ingredient").eq(14).drag("@elementList");
    cy.get("[class^=burger-constructor_containerTotal]").should('exist');
    cy.get("@ingredient").eq(1).drag("@elementList");
    cy.get("button").contains("Оформить заказ").should('exist');
  });

});