import { createStore } from './globalStore';

interface CounterStoreProps {
  currentNumber: number;
  ammount?: number;
}

export enum CounterStoreFunctions {
  add = 'ADD',
  subtract = 'SUBTRACT',
}

export const counterActions: {
  type: CounterStoreFunctions;
  func: (actionProps: CounterStoreProps) => number;
}[] = [
  {
    type: CounterStoreFunctions.add,
    func: (actionProps: CounterStoreProps) => {
      return actionProps.ammount ? actionProps.currentNumber + actionProps.ammount : actionProps.currentNumber + 1;
    },
  },
  {
    type: CounterStoreFunctions.subtract,
    func: (actionProps: CounterStoreProps) => {
      return actionProps.ammount ? actionProps.currentNumber - actionProps.ammount : actionProps.currentNumber - 1;
    },
  },
];

export const counterStore = createStore(0, counterActions);
