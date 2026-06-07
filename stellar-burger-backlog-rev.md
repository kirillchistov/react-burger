# Stellar Burger — Ревью бэклога

> **Документ:** правки и комментарии к `stellar-burger-backlog.md`  
> **Дата:** 07.06.2026  
> **Статус:** актуализирован по текущему коду репозитория

---

## Общая оценка

Бэклог **в целом качественный**: проблемы привязаны к реальному коду, приоритеты логичны (баги → инфра → RTK → UX → DevOps). Ниже — уточнения, с чем согласны/не согласны, и что уже сделано.

---

## Согласен полностью

| Пункт | Комментарий |
|---|---|
| BUG-01 refreshToken | Подтверждено в `api.ts`: отправлялся `accessToken` вместо `refreshToken` |
| BUG-02 side-effect в constants | `document.getElementById('modals')` на уровне модуля — реальная проблема |
| BUG-03 console.log | Есть в `api.ts`, `auth-actions.ts`, `wsMiddlewares.ts` |
| Дублирование URL (`enum` + `const`) | Два источника правды в `constants.ts` |
| Дублирование `RootState` / `AppDispatch` | Объявлены в `store.ts` и `services/types/index.ts` |
| Захламлённый authReducer | Смешение общих и специфичных флагов — подтверждается |
| CRA как техдолг | Проект на `react-scripts 5.0.1` |
| Classic Redux без RTK | `@reduxjs/toolkit` в `package.json`, но в коде не используется |
| Хардкод deploy IP | `deploy-script` с `62.84.123.141` в `package.json` |
| Нет UI-ошибок для API | `catch` в основном пишет в консоль |
| Сильные стороны (protected routes, modal routing, WS) | Всё реализовано и описано верно |

---

## Согласен частично / нужны правки

### UX-05 · Подсветка активного пункта меню

**В бэклоге:** «неизвестно, используется ли NavLink с isActive».

**Факт:** в `app-header.tsx` активность уже реализована через `matchPath` + условные стили иконок/текста.

**Правка:** переформулировать задачу как рефактор на `NavLink` с `className={({ isActive }) => ...}` (опционально). Оценку снизить до ~30 мин или понизить приоритет до P4.

---

### TEST-02 · Cypress E2E «тестов нет»

**В бэклоге:** «Cypress настроен, но тестов нет».

**Факт:** уже есть сценарии:
- `cypress/e2e/burger-constructor/add-ingredient.cy.ts`
- `cypress/e2e/burger-constructor/burger-construction-session.cy.ts`
- `cypress/e2e/burger-constructor/first-session.cy.ts`
- `cypress/e2e/burger-ingredients/ingredient-details-modal.cy.ts`

**Правка:** задача — **расширить** покрытие (auth, оформление заказа), а не писать с нуля.

---

### TEST-01 · «Тесты почти пусты»

**В бэклоге:** только закомментированный `redux.test.js`.

**Факт:** 5 unit-тестов редьюсеров уже существуют (`auth`, `order`, `ingredient`, `ws`, `ws-auth`).

**Правка:** задача — **дописать/стабилизировать** (Vitest после Vite), а не создавать первые тесты.

---

### UX-03 · Страница 404

**В бэклоге:** «не удалось получить полный контент».

**Факт:** `not-found.tsx` уже содержит заголовок, текст и кнопку «на главную».

**Правка:** это polish (анимация, стили), не «с нуля». P4 вместо P3.

---

### A11Y-01 · Модальные окна

**В бэклоге:** «закрытие по Escape — неизвестно».

**Факт:** в `modal.tsx` Escape обрабатывается. Не хватает `role="dialog"`, focus trap, возврата фокуса.

**Правка:** уточнить scope — дополнить a11y, а не «проверить Escape».

---

### RTK-01 · «-60% строк в services/»

**Оценка завышена.** WS-middleware, сложный auth, типы останутся. Реалистичнее **-30..40%** без RTK Query.

---

### RTK как «самая высокоприоритетная» рефакторинговая задача

Для **портфолио** — да. Для **сданного учебного проекта** — спорно. Рекомендация: после BUG-01..03 и UX-01 (ошибки в UI) RTK можно ставить на неделю 2, но не раньше критических багов.

---

## Не согласен / устарело

| Пункт | Почему |
|---|---|
| «React Router v5, нужна миграция» | Уже v6 в `app.tsx` (`Routes`, `Route element`, `useNavigate`) |
| «Modal routing неизвестен» | Реализован через `location.state.background` |
| TEST-02 «тестов нет» | См. выше — E2E уже есть |

---

## Пропущено в оригинальном бэклоге

Добавить в бэклог:

| ID | Задача | Приоритет | Оценка |
|---|---|---|---|
| BUG-04 | Импорт из `react-router` вместо `react-router-dom` (`burger-constructor.tsx`, было в `order.tsx`) | P1 | 15 мин |
| INFRA-03 | Настроить path alias `@/` в сборщике (tsconfig уже есть, CRA/webpack alias — нет) | P2 | 1–2 ч |
| BUG-05 | `@reduxjs/toolkit` в dependencies, но не используется — либо мигрировать, либо убрать | P3 | — |

---

## Выполнено в этой сессии

| ID | Статус | Что сделано |
|---|---|---|
| BUG-01 | ✅ | `refreshToken` отправляет `getCookie('refreshToken')` |
| BUG-02 | ✅ | `getModalRoot()` вместо side-effect при импорте |
| BUG-03 | ✅ | `devLog` — логи только в `development`; убраны `console.log` из prod-пути |

---

## Скорректированная сводная таблица (фрагмент)

| # | Задача | Было | Стало |
|---|---|---|---|
| BUG-01 | refreshToken bug | 🔴 P1 | ✅ Done |
| BUG-02 | Side-effect constants | 🔴 P1 | ✅ Done |
| BUG-03 | console.log в прод | 🔴 P1 | ✅ Done |
| BUG-04 | react-router импорт | — | 🔴 P1, 15 мин |
| UX-05 | NavLink активный пункт | 🟡 P3, 1–2 ч | 🟢 P4, рефактор |
| UX-03 | Страница 404 | 🟡 P3 | 🟢 P4 |
| TEST-01 | Unit-тесты редьюсеров | «первые тесты» | «дописать + Vitest» |
| TEST-02 | Cypress E2E | «с нуля» | «расширить покрытие» |

---

## Рекомендуемый порядок следующих шагов

1. **BUG-04** — поправить импорты `react-router` → `react-router-dom`
2. **INFRA-03** — alias `@/` в webpack (или сразу **INFRA-01** Vite, где alias проще)
3. **UX-01** — ошибки API в UI (до RTK, чтобы пользователь видел фидбек)
4. **INFRA-01** — миграция CRA → Vite
5. **RTK-01** — миграция Redux

---

*Ревью составлено на основе анализа `stellar-burger-backlog.md` и исходного кода проекта.*
