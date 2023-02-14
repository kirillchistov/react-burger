import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

//  Надо дописать хуки и состояние  //
const Tabs = () => {
  const [current, setCurrent] = useState("bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;