import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layout
import HeaderBar from './layout/HeaderBar';
import { CssBaseline, Box } from '@mui/material';
import SideBar from './layout/SideBar';

import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';

import TestRedux1 from './components/TestRedux1';
import TestRedux2 from './components/TestRedux2';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';

import HomePageAdmin from './components/pages/admin/HomePageAdmin';

function App() {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        {/* Publish */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* Admin */}
        <div className="app">
          <SideBar />
          <main className="content">
            <HeaderBar />
            <div className="content_body">
              <Box m="20px">
                <Routes>
                  <Route path="/admin/viewtable" element={<FormProduct />} />
                  <Route path="/edit/:id" element={<FormEditProduct />} />
                </Routes>
              </Box>
            </div>
          </main>
        </div>
        {/* <TestRedux1 />
        <hr />
        <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
