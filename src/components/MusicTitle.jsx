import React from "react";

function MusicTitle({ title }) {
  return (
    <h2 className="text-center mb-3" data-testid="music-title">
      {title}
    </h2>
  );
}

export default MusicTitle;
