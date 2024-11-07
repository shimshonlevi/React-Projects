import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index.ts"; // תעדכן לפי הנתיב שלך
import { increment, decrement, incrementByAmount, reset } from "../../store/features/counter/counterSlice.ts";

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value); // קורא את הערך הנוכחי של המונה

  return (
    <div>
      <h1>Counter: {count}</h1>
      <input
        type="number"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
          dispatch(incrementByAmount(Number(e.target.value)))}/>      
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
