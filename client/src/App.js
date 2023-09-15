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
import { currentUser } from './functions/auth';

import HomePageAdmin from './components/pages/admin/HomePageAdmin';
import AdminRoute from './routes/AdminRoute';

import { useDispatch } from 'react-redux';
import { login } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.getItem('Token');
  currentUser(idToken)
    .then((res) => {
      console.log(res);
      dispatch(login({
        name: res.data.name,
        role: res.data.role,
        token: idToken
      }));
    }).catch((err) => {
      console.log(err);
    });
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        {/* Publish */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        

        {/* Admin */}
        <Route path="/admin/index" element={
          <AdminRoute>
            <HomePageAdmin />
          </AdminRoute>
        } />

        <Route path="/admin/viewtable" element={
          <AdminRoute>
            <FormProduct />
          </AdminRoute>
        } />
        <Route path="/edit/:id" element={
          <AdminRoute>
            <FormEditProduct />
          </AdminRoute>
        } />
        </Routes>

        {/* <TestRedux1 />
        <hr />
        <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
