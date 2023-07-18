import { createStore } from './globalStore';

export interface TodosProps {
  item: string;
  key: number;
  isChecked: boolean;
}

interface TodosStoreProps {
  todosArray: TodosProps[];
  item: TodosProps;
}

export enum TodosStoreFunctions {
  add = 'ADD',
  delete = 'DELETE',
  check = 'CHECK',
}

export const todosActions: { type: TodosStoreFunctions; func: (actionProps: TodosStoreProps) => TodosProps[] }[] = [
  {
    type: TodosStoreFunctions.add,
    func: (actionProps: TodosStoreProps) => {
      return [...actionProps.todosArray, actionProps.item];
    },
  },
  {
    type: TodosStoreFunctions.delete,
    func: (actionProps: TodosStoreProps) => {
      return actionProps.todosArray.filter((todo) => todo.key !== actionProps.item.key);
    },
  },
  {
    type: TodosStoreFunctions.check,
    func: (actionProps: TodosStoreProps) => {
      return actionProps.todosArray.map((todo) => {
        return todo.key === actionProps.item.key ? { ...todo, isChecked: !todo.isChecked } : { ...todo };
      });
    },
  },
];

export const todoStore = createStore([], todosActions);
