import { Box, NumberInput, Text } from '@mantine/core';
import { DefaultButton } from './TodoList';
import { useStore } from '../store/globalStore';
import { counterStore, CounterStoreFunctions } from '../store/counter.store';
import { useState } from 'react';
const Counter = () => {
  const [count, setCount] = useStore(counterStore);
  const [input, setInput] = useState<number | undefined>();

  const onAdd = (num?: number) => {
    setCount({ currentNumber: count, ammount: num }, CounterStoreFunctions.add);
  };

  const onSubtruct = (num?: number) => {
    setCount({ currentNumber: count, ammount: num }, CounterStoreFunctions.subtract);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      <Text>Just simple counter, why?</Text>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
        <DefaultButton onClick={() => onSubtruct()}>-</DefaultButton>
        <Text>{count}</Text>
        <DefaultButton onClick={() => onAdd()}>+</DefaultButton>
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
        <DefaultButton onClick={() => onSubtruct(input)}>Убавить</DefaultButton>
        <NumberInput onChange={(value) => setInput(value === '' ? undefined : value)} />
        <DefaultButton onClick={() => onAdd(input)}>Добавить</DefaultButton>
      </Box>
    </Box>
  );
};

export default Counter;
