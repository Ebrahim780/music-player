import React from "react";

const Progress = ({ musicInfo, setMusicInfo, }) => {

  const dragHandler = (e) => {
    musicInfo.currentTime = e.target.value;
    setMusicInfo({ ...musicInfo, currentTime: e.target.value });
  };

  const takeAnim = {
    transform: `translateX(${musicInfo.animationPercentage}%)`,
  }

  return (
    <div className="row justify-content-center">
      <div className="progress col-lg-6 col-10 my-5">
        <div className="track"
          style={{
            background: `linear-gradient(to right, cyan, teal)`,
          }}>
          <input
            type="range"
            min={0}
            max={musicInfo.duration || 0}
            id="progress-bar"
            value={musicInfo.currentTime}
            className="progress-bar"
            onChange={dragHandler}
          />
          <div style={takeAnim} className="animate-track"></div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
