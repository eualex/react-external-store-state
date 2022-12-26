import { useSyncExternalStore, createContext, useContext } from "react";
import { Selector, Store, store } from "../store";

const ServerContext = createContext({} as Store);

export function getServerSideProps() {
  return {
    props: {
      inicialState: {
        value1: 10,
        value2: 20,
      },
    },
  };
}

function useStore<I>(
  selector: Selector<Store, I> = (state) =>
    state as ReturnType<Selector<Store, I>>
) {
  const inicialState = useContext(ServerContext)

  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState()),
    () => selector(inicialState),
  );
}

function DisplayValue({ item }: { item: keyof Store }) {
  const value = useStore<typeof item>((state) => state[item]);

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

function App({
  inicialState,
}: {
  inicialState: Store;
}) {
  store.serverInicialize(inicialState)
  return (
    <ServerContext.Provider value={inicialState}>
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
    </ServerContext.Provider>
  );
}

export default App;
