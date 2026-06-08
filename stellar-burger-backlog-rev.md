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

## Выполнено (BUG-01..03)

| ID | Статус | Что сделано | Файлы |
|---|---|---|---|
| BUG-01 | ✅ | `refreshToken` отправляет `getCookie('refreshToken')` | `src/utils/api.ts` |
| BUG-02 | ✅ | `getModalRoot()` вместо side-effect при импорте; `Modal` вызывает функцию | `src/utils/constants.ts`, `src/components/modal/modal.tsx` |
| BUG-03 | ✅ | Утилита `devLog` с guard `NODE_ENV === 'development'`; prod-путь без `console.log` | `src/utils/devLog.ts`, `src/utils/api.ts`, `src/services/actions/auth-actions.ts`, `src/services/middlewares/wsMiddlewares.ts` |
| BUG-04 | ✅ | `useNavigate` из `react-router-dom` (было `react-router`) | `src/components/burger-constructor/burger-constructor.tsx` |

### Проверка целостности (07.06.2026)

```bash
pnpm test    # 5 suites, 30 tests passed (Vitest)
pnpm build   # tsc + vite build → dist/
```

---

## Выполнено (INFRA-01, INFRA-03)

| ID | Статус | Что сделано |
|---|---|---|
| INFRA-01 | ✅ | CRA → Vite: `vite.config.ts`, корневой `index.html`, скрипты `start`/`build`/`preview`, Vitest вместо Jest, `dist/` вместо `build/` |
| INFRA-03 | ✅ | Alias `@/` в Vite (`resolve.alias`) + `tsconfig paths`; импорты в `src/` переведены на `@/...` |

**Удалено:** `react-scripts`, `public/index.html`, `babel.config.js`, `src/react-app-env.d.ts`, пустой `src/__tests__/redux.js`

**Скрипты:**
| Было | Стало |
|---|---|
| `react-scripts start` | `vite` (порт 3000 — Cypress без изменений) |
| `react-scripts build` | `tsc --noEmit && vite build` |
| `react-scripts test` | `vitest run` |
| `gh-pages -d build` | `gh-pages -d dist` |

**Проверка (08.06.2026):** `pnpm test` — 30/30, `pnpm build` — успешно (~640 ms).

---

## Выполнено (API-01)

| ID | Статус | Что сделано |
|---|---|---|
| API-01 | ✅ | Новый адрес API: `BURGER_API_URL` из `.env`, единый слой `burger-api.ts`, Redux actions переведены на новые «ручки», WS URL выводится из API URL |
| API-02 | ✅ | Авторизация и protected routes: cookies + store, refresh при `jwt expired`, прелоадер при восстановлении сессии, редирект при ошибке |

**Файлы:** `src/utils/burger-api.ts`, `.env.example`, `auth-actions.ts`, `ingredient-actions.ts`, `order-actions.ts`, `protected-route.tsx`, `constants.ts`

**Удалено:** `src/utils/api.ts` (старый URL `norma.nomoreparties.space`), `src/utils/burdger-api.ts` (черновик с неверными импортами)

---

## Скорректированная сводная таблица (фрагмент)

| # | Задача | Было | Стало |
|---|---|---|---|
| BUG-01 | refreshToken bug | 🔴 P1 | ✅ Done |
| BUG-02 | Side-effect constants | 🔴 P1 | ✅ Done |
| BUG-03 | console.log в прод | 🔴 P1 | ✅ Done |
| BUG-04 | react-router импорт | — | ✅ Done |
| INFRA-01 | CRA → Vite | 🟠 P2, 1–1.5 дня | ✅ Done |
| INFRA-03 | Alias `@/` в сборщике | 🟠 P2, 1–2 ч | ✅ Done |
| API-01 | Починка API (новый URL) | 🔴 P1 | ✅ Done |
| API-02 | Auth + protected routes | 🟠 P2 | ✅ Done |
| TEST-01 | Vitest + unit-тесты | «первые тесты» | ✅ Vitest настроен, 30 тестов |
| UX-05 | NavLink активный пункт | 🟡 P3, 1–2 ч | 🟢 P4, рефактор |
| UX-03 | Страница 404 | 🟡 P3 | 🟢 P4 |
| TEST-01 | Unit-тесты редьюсеров | «первые тесты» | «дописать + Vitest» |
| TEST-02 | Cypress E2E | «с нуля» | «расширить покрытие» |

---

## Рекомендуемый порядок следующих шагов

1. **UX-01** — ошибки API в UI
2. **INFRA-02** — ESLint + Prettier + husky
3. **RTK-01** — миграция Redux
4. **TEST-02** — расширить Cypress E2E (auth, оформление заказа)
5. **DEVOPS-01** — GitHub Actions CI

---

*Ревью составлено на основе анализа `stellar-burger-backlog.md` и исходного кода проекта.*
