import { useState, useEffect } from 'react';

interface StoreProps<StoreValue, ReducerProps, FuncTypes> {
  get: () => StoreValue;
  set: (action: ReducerProps, type: FuncTypes) => void;
  listener: (newListener: (param: StoreValue) => void) => () => void;
}

export const createStore = <StoreValue, ReducerProps, FuncTypes>(
  initValue: StoreValue,
  initFunction: { type: FuncTypes; func: (action: ReducerProps) => StoreValue | Promise<StoreValue> }[],
): StoreProps<StoreValue, ReducerProps, FuncTypes> => {
  let value = initValue;
  let functions = initFunction;
  const listeners = new Set<(newValue: StoreValue) => void>();

  return {
    get: () => value,
    set: (action: ReducerProps, type: FuncTypes) => {
      const currentFunction = functions.find((funct) => funct.type === type)?.func(action);
      if (currentFunction && typeof (currentFunction as any).then === 'function') {
        value = null as StoreValue;
        (currentFunction as any as Promise<StoreValue>).then((res) => {
          value = res;
          listeners.forEach((listener) => listener(value));
        });
      } else {
        value = (currentFunction as StoreValue | undefined) ?? value;
        listeners.forEach((listener) => listener(value));
      }
    },
    listener: (newListener) => {
      listeners.add(newListener);
      return () => {
        listeners.delete(newListener);
      };
    },
  };
};

export const useStore = <StoreValue, ReducerProps, FuncTypes>(
  store: StoreProps<StoreValue, ReducerProps, FuncTypes>,
): [StoreValue, (arg: ReducerProps, type: FuncTypes) => void] => {
  const [value, setValue] = useState(store.get());

  useEffect(() => {
    const removeListener = store.listener(setValue);
    return () => {
      removeListener();
    };
  }, [store]);

  return [value, store.set];
};
