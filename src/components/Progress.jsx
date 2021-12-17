import React from "react";

function Progress({ currentTime }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-12">
        <div className="progress my-5">
          <div
            data-testid="progress-bar"
            id="progress-bar"
            className="progress-bar"
            style={{ width: `${currentTime}%` }}
            role="progressbar"
          />
        </div>
      </div>
    </div>
  );
}

export default Progress;
