import React from "react";
import Musics from "../data/Musics";
import Next from "../assets/next.svg";
import Prev from "../assets/prev.svg";
import Play from "../assets/play.svg";
import Pause from "../assets/pause.svg";
import Button from "../components/Button";
import Mute from "../assets/volume-mute.svg";
import SoundUp from "../assets/volume-up.svg";
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
    isMute: false,
    activeVolume: false,
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

  }, [state])

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

  const next = async () => {
    if (state.counter >= Musics.length - 1)
      setState({
        ...state,
        counter: 0,
        musicRef: Musics[0]
      })

    else
      setState({
        ...state,
        counter: ++state.counter,
        musicRef: Musics[state.counter]
      })

    await state.isPlaying ? currentMusic.current.play() : currentMusic.current.pause();
  };

  const prev = async () => {
    if (state.counter === 0)
      setState({
        ...state,
        counter: Musics.length - 1,
        musicRef: Musics[Musics.length - 1]
      })

    else
      setState({
        ...state,
        counter: --state.counter,
        musicRef: Musics[state.counter]
      })

    await state.isPlaying ? currentMusic.current.play() : currentMusic.current.pause();
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
    currentMusic.current.play();
  }

  const changeVolume = (e) => {
    let volume = Number(e.target.value);
    currentMusic.current.volume = volume;
    setMusicInfo({ ...musicInfo, volume })
    if (currentMusic.current.volume > 0)
      setState({ ...state, isMute: false })
    else
      setState({ ...state, isMute: true })
  }

  return (
    <Container>
      <MusicTitle title={state.musicRef.name} />
      <Progress
        currentTime={musicInfo.currentTime}
        setMusicInfo={setMusicInfo}
        musicInfo={musicInfo}
        currentMusic={currentMusic}
      />
      <audio
        onTimeUpdate={timeHanlder}
        onLoadedMetadata={timeHanlder}
        onEnded={musicEndHandler}
        src={state.musicRef.path}
        ref={currentMusic}
      />
      <div className="row justify-content-center">
        <Button
          onClick={prev}
          src={Prev}
        />
        <Button
          onClick={play}
          src={state.isPlaying ? Pause : Play}
        />
        <Button
          onClick={next}
          src={Next}
        />
        <Button
          onClick={() => setState({ ...state, activeVolume: !state.activeVolume })}
          src={state.isMute ? Mute : SoundUp}
        />
        {state.activeVolume && (
          <input
            onChange={changeVolume}
            value={musicInfo.volume}
            type="range"
            step={0.01}
            min={0}
            max={1}
          />
        )}
      </div>
    </Container>
  )
};

export default MusicPlayer;