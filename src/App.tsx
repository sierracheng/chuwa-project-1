import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Home">
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
