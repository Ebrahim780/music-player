import React from "react";
import Musics from "../data/Musics";
import Next from "../assets/next.svg";
import Prev from "../assets/prev.svg";
import Play from "../assets/play.svg";
import Pause from "../assets/pause.svg";
import Button from "../components/Button";
import Progress from "../components/Progress";
import Container from "../components/Container";
import MusicTitle from "../components/MusicTitle";
import { useEffect, useState, useRef } from "react";
// import Audio from "../models/Audio";

const MusicPlayer = () => {
  // State
  const [state, setState] = useState({
    counter: 0,
    isPlaying: false,
    isEneded: false,
    musicRef: Musics[0],
  })
  const [musicInfo, setMusicInfo] = useState({
    volume: 0,
    duration: 0,
    currentTime: 0,
    animationPercentage: 0
  })

  // ref
  const currentMusic = useRef(null)

  useEffect(() => {
    console.log(currentMusic)
    // console.log(musicInfo)
  }, [state, musicInfo])

  const timeHanlder = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

    setMusicInfo({
      ...musicInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  }

  const next = () => {
    if (state.counter >= Musics.length - 1) {
      setState({
        ...state,
        counter: 0,
        musicRef: Musics[0]
      })
    }
    else {
      setState({
        ...state,
        counter: ++state.counter,
        musicRef: Musics[state.counter]
      })
    }
  };

  const prev = () => {
    if (state.counter === 0) {
      setState({
        ...state,
        counter: Musics.length - 1,
        musicRef: Musics[Musics.length - 1]
      })
    }
    else {
      setState({
        ...state,
        counter: --state.counter,
        musicRef: Musics[state.counter]
      })
    }
  };

  const play = () => {
    if (!state.isPlaying) {
      currentMusic.current.play()
      setState({ ...state, isPlaying: !state.isPlaying })
    }
    else {
      currentMusic.current.pause()
      setState({ ...state, isPlaying: !state.isPlaying })
    }
  };

  const musicEndHandler = async () => {
    await next();
    await currentMusic.current.play();
  }

  return (
    <Container>
      <MusicTitle title={state.musicRef.name} />
      <Progress
        currentTime={musicInfo.currentTime}
        setMusicInfo={setMusicInfo}
        musicInfo={musicInfo}
      />
      <audio
        onTimeUpdate={timeHanlder}
        onLoadedMetadata={timeHanlder}
        onEnded={musicEndHandler}
        src={state.musicRef.path}
        ref={currentMusic}
      />
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
  )
};

export default MusicPlayer;