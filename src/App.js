import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "./MainLayout";
import Login from "../src/components/auth/Login";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import "./App.css";
import UserList from "./components/User/UserList";
import UserDetail from "./components/User/UserDetail";

const App = () => {
  return (
    <div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <MainLayout component={<UserList/>}/>
              </ProtectedRoutes>
            }
          />
           <Route
            path="/user"
            element={
              <ProtectedRoutes>
                <MainLayout component={<UserList/>}/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoutes>
                <MainLayout component={<UserDetail/>}/>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </>
    </div>
  );
};

export default App;
