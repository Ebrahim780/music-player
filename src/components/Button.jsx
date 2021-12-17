import React from "react";

function Button({src, ...props}) {
  return (
    <button
      type="button"
      className="btn music-btn mx-2"
      {...props}
    >
      <img alt="btn-icon" src={src} className="icon-btn" />
    </button>
  );
}

export default Button;
