import List, { DefaultButton } from './TodoList';
import { useState } from 'react';
import { Box, TextInput, Text } from '@mantine/core';
import { useStore } from '../store/globalStore';
import { todoStore, TodosStoreFunctions } from '../store/todos.store';

const TodoContainer = () => {
  const [currentItem, setCurrentItem] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [todos, setTodos] = useStore(todoStore);

  const addTodo = () => {
    if (!currentItem.trim().length) {
      setIsError(true);
      return;
    }
    setTodos(
      {
        todosArray: todos,
        item: { item: currentItem, key: Date.now(), isChecked: false },
      },
      TodosStoreFunctions.add,
    );
    setCurrentItem('');
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        width: '50vw',
        margin: '0 auto',
      }}
    >
      <Text>Todo List. The design is very human</Text>
      <Box>
        <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          <TextInput
            style={{ boxShadow: '0px 1px 1px 1px black', borderRadius: '8px' }}
            placeholder="Add task"
            value={currentItem}
            onChange={(e) => {
              setIsError(false);
              setCurrentItem(e.target.value);
            }}
          />
          <DefaultButton onClick={() => addTodo()}>Add</DefaultButton>
        </Box>
        {isError && <Text size="xs">Надо написать что-то</Text>}
      </Box>

      <List itemList={todos} />
    </Box>
  );
};

export default TodoContainer;
