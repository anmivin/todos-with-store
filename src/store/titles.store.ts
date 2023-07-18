import { createStore } from './globalStore';
export interface Titles {
  id: number;
  item: string;
  discription: string;
}

interface TitlesStoreProps {
  titles: Titles[];
  pattern: string;
}

export enum TitlesStoreFunctions {
  filter = 'FILTER',
}

const titles: Titles[] = [
  {
    id: 1,
    item: 'Жожа',
    discription: 'Мужики из местной качалки понтуются и учат правильно позировать на фото',
  },
  {
    id: 2,
    item: 'Тетрадь',
    discription:
      'Отличник с психическими отклонениями драматично ест чипсы и пытается подавить свои чувства к загадочному эмо-бою',
  },
  {
    id: 3,
    item: 'Атака',
    discription: 'Родившейся в очень странной семье мальчик знает весь сюжет, но не спойлерит другим',
  },
  {
    id: 4,
    item: 'Сэйлормун',
    discription:
      'Обычные японские школьницы спасают планету, влияют на фэшн-индустрию и формируют дисморфофобию у зрителей',
  },
  {
    id: 5,
    item: 'Хигураши',
    discription: 'Группа школьников пытается пережить летний фестиваль. Гаремник с подвохом',
  },
  {
    id: 6,
    item: 'Дзюндзи Ито',
    discription: ' Школьник безобидно шутит над своими одноклассниками и другие истории из жизни в японской глубинке',
  },
  {
    id: 7,
    item: 'Путь домохозяина',
    discription: 'Мафиозник и его идеальная жизнь',
  },
  {
    id: 8,
    item: 'Токийские мстители',
    discription: 'Самые горячие мужики в мире дерутся и умирают, а потом не умирают, а потом опять умирают',
  },
  {
    id: 9,
    item: 'Наруто',
    discription: 'Гиперактивный сирота побеждает всех силой дружбы и становится председателем сельсовета',
  },
];

const titlesActions: {
  type: TitlesStoreFunctions;
  func: (actionProps: TitlesStoreProps) => Titles[];
}[] = [
  {
    type: TitlesStoreFunctions.filter,
    func: (actionProps: TitlesStoreProps) => {
      let searchList: Titles[] = [];
      if (!actionProps.pattern.length) return titles;
      searchList = actionProps.titles.filter(
        (item) =>
          item.item.toLowerCase().includes(actionProps.pattern.toLowerCase()) ||
          item.discription.toLowerCase().includes(actionProps.pattern.toLowerCase()),
      );
      if (searchList.length) {
        return searchList;
      } else {
        return actionProps.titles;
      }
    },
  },
];

export const titlesStore = createStore(titles, titlesActions);
