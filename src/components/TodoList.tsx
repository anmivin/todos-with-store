import { Box, Checkbox, ButtonProps, Text, Button, createPolymorphicComponent } from '@mantine/core';
import styled from '@emotion/styled';
import { useStore } from '../store/globalStore';
import { todoStore, TodosStoreFunctions } from '../store/todos.store';
export interface TodosProps {
  item: string;
  key: number;
  isChecked: boolean;
}

export interface TodosItemsProps {
  itemList: TodosProps[];
}
const _DefaultButton = styled(Button)`
  background-color: #a7ffda;
  color: black;
  box-shadow: 0px 1px 1px 1px black;
  &:hover {
    box-shadow: inset 0px 1px 1px 1px black;
    background-color: #a7ffda;
  }
`;
export const DefaultButton = createPolymorphicComponent<'button', ButtonProps>(_DefaultButton);

const List = ({ itemList }: TodosItemsProps) => {
  const [todos, setTodos] = useStore(todoStore);
  const deleteItem = (item: TodosProps) => {
    setTodos({ todosArray: itemList, item: item }, TodosStoreFunctions.delete);
  };

  const completeItem = (item: TodosProps) => {
    setTodos({ todosArray: itemList, item: item }, TodosStoreFunctions.check);
  };

  return (
    <>
      {todos.map((item: TodosProps) => {
        return (
          <Box
            key={item.key}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Checkbox
              color="teal"
              onChange={() => completeItem(item)}
              checked={item.isChecked}
              label={<Text strikethrough={item.isChecked}>{item.item}</Text>}
            />
            <DefaultButton onClick={() => deleteItem(item)}>&#215;</DefaultButton>
          </Box>
        );
      })}
    </>
  );
};

export default List;
