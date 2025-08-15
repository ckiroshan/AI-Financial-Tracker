import { Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./components/layouts/root-layout.page";
import HomePage from "./pages/home.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
