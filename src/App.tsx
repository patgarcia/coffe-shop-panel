import { useCallback, useMemo, useState } from "react";
import "./App.css";
import Menu from "./components/Menu.tsx";

export interface coffeeItem {
  item: string;
  prepTime: number;
  id?: number;
}

interface coffeeState {
  [key: string]: coffeeItem[];
}

const initState: coffeeState = {
  Menu: [
    { item: "Latte", prepTime: 3 },
    { item: "Mocha", prepTime: 5 },
    { item: "Frap", prepTime: 10 },
    { item: "Macha", prepTime: 4 },
    { item: "Drip", prepTime: 1 },
  ],
  Orders: [],
  Counter: [],
};

const changeOrder =
  (
    setOrders: React.Dispatch<React.SetStateAction<coffeeState>>,
    from: string | null,
    to: string | null,
    move: boolean = false
  ) =>
  (ev: React.MouseEvent<HTMLUListElement>) => {
    const target = ev.target as HTMLElement;
    const item = target.dataset.item;
    const prepTime = target.dataset.prepTime;
    const id = target.dataset.id ? +target.dataset.id : Math.random();
    const newItem: coffeeItem = {
      item: String(item),
      prepTime: Number(prepTime),
      id: Number(id),
    };
    setOrders((orders) => {
      let newOrders = { ...orders };
      if (to) {
        newOrders = {
          ...newOrders,
          [to]: [...orders[to], newItem],
        };
      }
      if (move && from) {
        const movedData = newOrders[from].filter(
          (coffeeItem: coffeeItem) => coffeeItem.id !== id
        ) as coffeeItem[];
        newOrders = { ...newOrders, [from]: movedData };
      }
      return { ...newOrders };
    });
  };

function App() {
  const [orders, setOrders] = useState<coffeeState>(initState);

  const menuState = useMemo(() => orders["Menu"], [orders["Menu"]]);
  const menuOrders = useMemo(() => orders["Orders"], [orders["Orders"]]);
  const menuCounter = useMemo(() => orders["Counter"], [orders["Counter"]]);

  const menuHandler = useCallback(
    changeOrder(setOrders, "Menu", "Orders", false),
    []
  );
  const ordersHandler = useCallback(
    changeOrder(setOrders, "Orders", "Counter", true),
    []
  );
  const counterHandler = useCallback(
    changeOrder(setOrders, "Counter", null, true),
    []
  );

  return (
    <div className="menu-board">
      <Menu title="Menu" orders={menuState} changeOrder={menuHandler} />
      <Menu
        title="Orders"
        orders={menuOrders}
        changeOrder={ordersHandler}
        timer={true}
      />
      <Menu title="Counter" orders={menuCounter} changeOrder={counterHandler} />
    </div>
  );
}

export default App;
