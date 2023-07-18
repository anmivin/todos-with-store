import TodoContainer from './components/TodoContainer';
import Counter from './components/Counter';
import Async from './components/Async';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Spisok from './components/Spisok';
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoContainer />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/spisok" element={<Spisok />} />
            <Route path="/async" element={<Async />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
