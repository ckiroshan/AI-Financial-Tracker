import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="text-red-700">This site is working perfectly 😉!</h1>
        <Button variant="default" className="text-lg px-8 py-3 shadow-lg bg-amber-300">
          Get Started
        </Button>
      </div>
    </>
  );
}

export default App;
