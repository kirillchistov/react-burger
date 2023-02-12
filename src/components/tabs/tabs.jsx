import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

//  Надо дописать хуки состояние отдельный компонент  //
export const SelectTab = () => {
  const [current, setCurrent] = useState("bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sause" active={current === "sause"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}