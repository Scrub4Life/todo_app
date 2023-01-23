import React from "react";
import background from "./images/bg-desktop-dark.jpg";

const Background = () => {
  return (
    <div
      className="bg-fixed bg-contain h-80 w-full"
      style={{ backgroundImage: `url(${background})` }}
    ></div>
  );
};

export default Background;
