import React from "react";
import Musics from "../data/Musics";
import Next from "../assets/next.svg";
import Prev from "../assets/prev.svg";
import Play from "../assets/play.svg";
import Pause from "../assets/pause.svg";
import Progress from "../components/Progress";
import MusicTitle from "../components/MusicTitle";
import Button from "../components/Button";
import Container from "../components/Container";
import Audio from "../models/Audio";

const MusicPlayer = () => {
  const [state, setState] = React.useState({
    isPlaying: false,
    /**
     * Define your state here
     */
  });

  const next = () => {
    // TODO Implement this function
  };
  const prev = () => {
    // TODO Implement this function
  };
  const play = () => {
    // TODO Implement this function
  };

  return (
    <Container>
      <MusicTitle /*title={MUSIC_TITLE}*/ />
      <Progress /*currentTime={CURRENT_TIME}*/ />

      <div className="row justify-content-center">
        <Button data-testid="prev-btn" onClick={prev} src={Prev} />
        <Button
          data-testid="play-btn"
          onClick={play}
          src={state.isPlaying ? Pause : Play}
        />
        <Button data-testid="next-btn" onClick={next} src={Next} />
      </div>
    </Container>
  );
};

export default MusicPlayer;
