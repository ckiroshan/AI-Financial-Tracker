import { Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./components/layouts/root-layout.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
