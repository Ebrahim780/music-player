import React from "react";

function MusicTitle({ title, cover, artist }) {
  return (
    <div className="title">
      <img src={cover} alt={title} className="title-cover"/>
      <h4 className="mt-4">
        {title}
      </h4>
      <h6 className="title-artist mt-2">
        {artist}
      </h6>
    </div>
  );
}

export default MusicTitle;