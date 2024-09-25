import React, { useEffect, useRef, useState } from "react";

interface MenuItemProps {
  item: string;
  prepTime: number;
  id: number | undefined;
  changeOrder: React.ReactEventHandler;
  timer?: boolean;
  customTime?: number | null;
}

const CountDown: React.FC<{ timer: number }> = ({ timer }) => {
  const [counter, setCounter] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: number;
    (async () => {
      timeoutId = await new Promise<number>((res) => setTimeout(res, 1000));
      setCounter((count: number | null) => {
        return count ? count - 1 : +timer
      });
    })();
    return () => (timeoutId ? clearTimeout(timeoutId) : undefined);
  });

  return <span>{counter ?? timer}</span>;
};

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  prepTime,
  id,
  changeOrder,
  timer,
  customTime,
}) => {
  const refElem = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    let timerId: number;
    if (timer || customTime) {
      (async () => {
        timerId = await new Promise((res) =>
          setTimeout(res, (customTime ?? +prepTime) * 1000)
        );
        if (refElem.current) {
          refElem.current.click();
        }
      })();
    }
    return () => (timerId ? clearTimeout(timerId) : undefined);
  }, []);

  const cdTimer = customTime ?? prepTime;

  return (
    <p
      key={String(id) ?? item}
      data-item={item}
      data-prep-time={prepTime}
      data-id={id}
      onClick={changeOrder}
      ref={refElem}
    >
      {item} {id && <CountDown timer={cdTimer} />}
    </p>
  );
};

export default React.memo(MenuItem);
