import React, { ReactEventHandler } from "react";
import { coffeeItem } from "../App";
import MenuItem from "./MenuItem";

interface MenuProps {
  title: string;
  orders: coffeeItem[];
  changeOrder: ReactEventHandler;
  timer?: boolean;
}

const Menu: React.FC<MenuProps> = ({ title, orders, changeOrder, timer }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {orders.map(({ item, prepTime, id }) => (
        <MenuItem
          key={item + id}
          item={item}
          prepTime={prepTime}
          id={id}
          changeOrder={changeOrder}
          timer={timer}
          customTime={title === "Counter" ? 3 : null}
        />
      ))}
    </div>
  );
};

export default React.memo(Menu);
