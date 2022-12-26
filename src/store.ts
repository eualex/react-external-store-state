export type Selector<T, K = unknown> = (state: T) => K extends keyof T ? T[K] : T 

type Listener<T> = (state: T) => void

export function createStore<T>(inicialStore: T) {
  let currentState = inicialStore
  const listeners = new Set<Listener<T>>()

  return {
    getState: () => currentState,
    setState: (newState: T) => {
      currentState = newState
      
      listeners.forEach(listener => listener(currentState))
    },
    subscribe: (listener: Listener<T>) => {
      listeners.add(listener)

      return () => {
        listeners.delete(listener)
      }
    }
  }
}

const storeValue = {
  value1: 0,
  value2: 0
}

export type Store = typeof storeValue

export const store = createStore<Store>(storeValue)
