import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import {
  ErrorPage,
  HomePage,
  LoginPage,
  SignUpPage,
  SuccessfulPage,
  ForgetPassword,
  UpdatePasswordPage,
  CreateProductPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/error"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path="/forgot-password/:email/update-password/:token"
          element={
            <Layout>
              <UpdatePasswordPage />
            </Layout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Layout>
              <ForgetPassword />
            </Layout>
          }
        />
        <Route
          path="/forgot-password-success"
          element={
            <Layout>
              <SuccessfulPage />
            </Layout>
          }
        />
        <Route
          path="/create-product"
          element={
            <Layout>
              <CreateProductPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
