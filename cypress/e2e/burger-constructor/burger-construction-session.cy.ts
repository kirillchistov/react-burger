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

  it("Кнопка заказа не активна, если конструктор пуст", () => {
    cy.get("span").contains("Добавьте ингредиенты для Вашего бургера!");
    // cy.get("[class^=button button_type_primary]").first().as("orderButton");
    cy.get('[id^=orderButton]').should('not.exist');;
    // cy.get("@orderButton").should("be.disabled");
  });

  it("Работает DnD, логин, отправка и подтверждение заказа", () => {
    cy.get("[class^=ingredient-item_ingredient]").as("ingredient");
    cy.get("[class^=burger-constructor_element__list__]").as("elementList");    
    cy.get("@ingredient").eq(0).drag("@elementList");
    cy.get("@ingredient").eq(3).drag("@elementList");
    cy.get("@ingredient").eq(7).drag("@elementList");
    cy.get("@ingredient").eq(11).drag("@elementList");
    cy.get("@ingredient").eq(13).drag("@elementList");
    cy.get("@ingredient").eq(14).drag("@elementList");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("form").find("h1").contains("Вход");
    cy.get('input[type="email"]').type("ben@mail.ru").should("have.value", "ben@mail.ru");
    cy.get('input[type="password"]').type("12345678").should("have.value", "12345678");
    cy.get("form").find("button").contains("Войти").as("loginBtn");
    cy.get("@loginBtn").click();
    cy.get("button").contains("Оформить заказ").click();
    cy.get("[class^=modal_container__]", { timeout: 40000 }).as("modal");
    cy.get("@modal").find("p").contains("Ваш заказ начали готовить");
    cy.get("@modal").find("svg").click();
  });

});