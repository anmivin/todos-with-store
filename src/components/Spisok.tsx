import { useState } from 'react';
import { Box, Text, TextInput } from '@mantine/core';
import { titlesStore, TitlesStoreFunctions } from '../store/titles.store';
import { useStore } from '../store/globalStore';
import { DefaultButton } from './TodoList';

const Spisok = () => {
  const [pattern, setPattern] = useState('');
  const [titles, setTitles] = useStore(titlesStore);

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
      <Text>Моё любимое whatever</Text>

      <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        <TextInput color="secondary" onChange={(e) => setPattern(e.target.value)} placeholder="Find" />
        <DefaultButton onClick={() => setTitles({ titles, pattern }, TitlesStoreFunctions.filter)}>
          Search
        </DefaultButton>
      </Box>
      <Text size="xs">сортирнуть по названию / описанию</Text>
      <Box>
        {titles.map((title) => (
          <Box p={2}>
            <Text size="lg">{title.item}</Text>
            <Text>{title.discription}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Spisok;
