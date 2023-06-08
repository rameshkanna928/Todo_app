import { useState } from "react";


import Navbar from "./components/nav";
import Todo from "./components/Todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-800 h-[100vh]">
      <Navbar />
      <Todo/>
    </div>
  );
}

export default App;
