import { Box, Text, TextInput, Anchor } from '@mantine/core';
import { DefaultButton } from './TodoList';
import { useStore } from '../store/globalStore';
import { asyncStore, AsyncFunctions } from '../store/async.store';
import { useState } from 'react';

const Async = () => {
  const [fetches, setFetches] = useStore(asyncStore);
  const [input, setInput] = useState<string>('');

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      <Text>ищем репы гитхаба по юзернейму</Text>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        <TextInput onChange={(e) => setInput(e.target.value)} />
        <DefaultButton
          onClick={() => {
            input.length && setFetches({ username: input }, AsyncFunctions.getRepos);
          }}
        >
          search
        </DefaultButton>
      </Box>

      {fetches?.length ? (
        <>
          {fetches.map((res) => (
            <Anchor href={res.html_url} target="_blank">
              {res.name}
            </Anchor>
          ))}
        </>
      ) : (
        <Text>ничего не найдено</Text>
      )}
    </Box>
  );
};

export default Async;
