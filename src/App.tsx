import { useEffect, useState } from "react";
import { Store, store } from "./store";

function useStore() {
  const [state, setState] = useState(store.getState())
  useEffect(() => store.subscribe(setState), [])
  return state
}

function DisplayValue({ item }: { item: keyof Store }) {
  const store = useStore()
  const value = store[item]

  return (
    <div>
      {item}: {value}
    </div>
  );
}

export function IncrementValue({ item }: { item: keyof Store }) {
  return (
    <button
      onClick={() => {
        const state = store.getState();

        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
}

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 600,
        gap: "1rem",
      }}
    >
      <IncrementValue item="value1" />
      <DisplayValue item="value1" />
      <IncrementValue item="value2" />
      <DisplayValue item="value2" />
    </div>
  );
}

export default App;
