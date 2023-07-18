import { createStore } from './globalStore';

export enum AsyncFunctions {
  getRepos = 'GET_REPOS',
}

interface AsyncStoreProps {
  username: string;
}

export const todosActions: { type: AsyncFunctions; func: (actionProps: AsyncStoreProps) => Promise<any[]> }[] = [
  {
    type: AsyncFunctions.getRepos,
    func: async (actionProps: AsyncStoreProps) => {
      return fetch(`https://api.github.com/users/${actionProps.username}/repos`).then((res) => res.json());
    },
  },
];

export const asyncStore = createStore([], todosActions);
