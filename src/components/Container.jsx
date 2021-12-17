import React from "react";

function Container({ children }) {
  return (
    <div className="app">
      <div className="container">{children}</div>
    </div>
  );
}

export default Container;
