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
  ResetPasswordPage,
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
          path="/forgot-password/:email/reset-password/:token"
          element={
            <Layout>
              <ResetPasswordPage />
            </Layout>
          }
        />
        <Route
          path="/update-password"
          element={
            <Layout>
              <ForgetPassword />
            </Layout>
          }
        />
        <Route
          path="/update-password-success"
          element={
            <Layout>
              <SuccessfulPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
