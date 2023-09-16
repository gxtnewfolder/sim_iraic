import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import ManageUser from "./components/pages/admin/ManageUser";
import HomepageUser from "./components/pages/user/HomepageUser";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Notfound404 from "./components/pages/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";
import Chart from "./components/Chart";

export function App() {
  // javascript
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token");
  // console.log("token", idToken);
  currentUser(idToken)
    .then((res) => {
      console.log(res);
      dispatch(
        login({
          name: res.data.name,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((err) => console.log(err));

  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        {/* Publish */}

        <Routes>
          <Route path="*" element={<Notfound404 text="The page you’re looking for doesn’t exist." />} />
          <Route path="/" element={<>
            <ResponsiveAppBar />  <h1>Homepage</h1>
          </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User */}
          <Route
            path="/user/index"
            element={<UserRoute>
              <HomepageUser />
            </UserRoute>} />

          {/* Admin */}
          <Route
            path="/admin/index"
            element={<AdminRoute>
              <HomePageAdmin />
            </AdminRoute>} />
          <Route
            path="/admin/manage"
            element={<AdminRoute>
              <ManageUser />
            </AdminRoute>} />

          <Route
            path="/admin/viewtable"
            element={<AdminRoute>
              <FormProduct />
            </AdminRoute>} />

          <Route
            path="/admin/viewchart"
            element={<AdminRoute>
              <Chart />
            </AdminRoute>} />

          <Route
            path="/edit/:id"
            element={<AdminRoute>
              <FormEditProduct />
            </AdminRoute>} />
        </Routes>

        {/* <TestRedux1 />
            <hr />
            <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
