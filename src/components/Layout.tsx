import { NavLink, Outlet } from 'react-router-dom';
import { Box, AppShell, Header } from '@mantine/core';
import { counterStore } from '../store/counter.store';
import { useStore } from '../store/globalStore';
import styled from '@emotion/styled';

const LinkElem = styled(NavLink)`
  padding: 5px 15px;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0px 1px 1px 1px black;
  color: black;
  &:hover,
  &:focus {
    box-shadow: inset 0px 1px 1px 1px black, 0px 0px 10px 5px #a7ffda;
  }
`;

const Layout = () => {
  const [count] = useStore(counterStore);
  return (
    <AppShell
      styles={{
        main: { backgroundColor: '#edfcf1' },
      }}
      header={
        <Header height={60} p="xs" display="flex" sx={{ gap: '20px' }}>
          <LinkElem to="/">Todo</LinkElem>
          <LinkElem to="/counter">Count ({count})</LinkElem>
          <LinkElem to="/spisok">Spisok</LinkElem>
          <LinkElem to="/async">Async</LinkElem>
        </Header>
      }
    >
      <Box>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default Layout;
