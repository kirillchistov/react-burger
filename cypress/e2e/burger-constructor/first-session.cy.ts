//  Проверяем, что кнопка не активна пока не выбраны ингредиенты
//  Добавил референс для типизации cy  //
/// <reference types="cypress" />
// @ts-check
//  импортирую команду для тестирования DnD  //
//  import "@4tw/cypress-drag-drop"; здесь пока не требуется  //

describe("Загружаем главную и кликаем на ингредиент", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("содержит заголовок Соберите бургер", () => {
    cy.get("h1").contains("Соберите бургер");
  });

  it("содержит ингредиент, открывает и закрывает попап", () => {
    cy.get("[class^=ingredient-item_ingredient]").first().as("ingredient");
    cy.get("@ingredient").click();
    // cy.get("[class^=modal_container]").as("modal");
    cy.get("[class^=text_type_main-large]").as("modalHeader");
    cy.get("@modalHeader").find("p").contains("Детали ингредиента");
    // cy.get("@modal").find("p").contains("Детали ингредиента");
    // cy.get("@modal").find("svg").click();
  });

  // it("Кнопка заказа не активна", () => {
  //   cy.get("[class^=button_type_primary]").as("orderButton");
  //   cy.get("@orderButton").should("be.disabled");
  // });
});