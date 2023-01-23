import { useState } from "react";
import Background from "./Background";
import Home from "./Home";

function App() {

  return (
    <div className="bg-gradient-to-r from-background1 to-backgrund2 h-screen">
      <Background />
      <Home />
    </div>
  );
}

export default App;
