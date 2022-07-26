import React from 'react'
import Musics from '../data'
import { useState, useRef } from 'react'
import Button from '../components/Button'
import Next from '../assets/icons/next.svg'
import Prev from '../assets/icons/prev.svg'
import Play from '../assets/icons/play.svg'
import Pause from '../assets/icons/pause.svg'
import Progress from '../components/Progress'
import Container from '../components/Container'
import MusicTitle from '../components/MusicTitle'
import Mute from '../assets/icons/volume-mute.svg'
import SoundUp from '../assets/icons/volume-up.svg'

const MusicPlayer = () => {
	const [state, setState] = useState({
		counter: 0,
		isPlaying: false,
		isMute: false,
		firstMusic: true,
		lastMusic: false,
		activeVolume: false,
		musicRef: Musics[0],
	})

	const [musicInfo, setMusicInfo] = useState({
		volume: 0,
		duration: 0,
		currentTime: 0,
		animationPercentage: 0,
	})

	// ref
	const currentMusic = useRef(null)

	const timeHanlder = e => {
		const current = e.target.currentTime
		const duration = e.target.duration

		const roundedCurrent = Math.round(current)
		const roundedDuration = Math.round(duration)
		const percentage = Math.round((roundedCurrent / roundedDuration) * 100)

		setMusicInfo({
			...musicInfo,
			currentTime: current,
			duration: duration,
			animationPercentage: percentage,
			volume: e.target.volume,
		})
	}

	const playHandler = async () => {
		await state.isPlaying
			? currentMusic.current.play()
			: currentMusic.current.pause()
	}

	const next = () => {
		if (state.counter >= Musics.length - 1)
			setState({
				...state,
				lastMusic: true,
			})
		else
			setState({
				...state,
				firstMusic: false,
				counter: ++state.counter,
				musicRef: Musics[state.counter],
			})

		playHandler()
	}

	const prev = () => {
		if (state.counter === 0)
			setState({
				...state,
				firstMusic: true,
			})
		else
			setState({
				...state,
				lastMusic: false,
				counter: --state.counter,
				musicRef: Musics[state.counter],
			})

		playHandler()
	}

	const play = () => {
		if (!state.isPlaying) currentMusic.current.play()
		else currentMusic.current.pause()
		setState({ ...state, isPlaying: !state.isPlaying })
	}

	const musicEndHandler = async () => {
		if (state.lastMusic) {
			await currentMusic.current.pause()
			setState({ ...state, isPlaying: !state.isPlaying })
		} else {
			next()
			await currentMusic.current.play()
		}
	}

	const changeVolume = e => {
		let volume = Number(e.target.value)
		currentMusic.current.volume = volume
		setMusicInfo({ ...musicInfo, volume })
		if (currentMusic.current.volume > 0) setState({ ...state, isMute: false })
		else setState({ ...state, isMute: true })
	}

	return (
		<Container>
			<MusicTitle
				isPlaying={state.isPlaying}
				title={state.musicRef.name}
				cover={state.musicRef.cover}
				artist={state.musicRef.artist}
			/>
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
			<div className='row justify-content-center'>
				<Button
					disabled={state.firstMusic}
					onClick={prev}
					src={Prev}
				/>
				<Button
					onClick={play}
					src={state.isPlaying ? Pause : Play}
				/>
				<Button
					disabled={state.lastMusic}
					onClick={next}
					src={Next}
				/>
				<Button
					onClick={() =>
						setState({ ...state, activeVolume: !state.activeVolume })
					}
					src={state.isMute ? Mute : SoundUp}
				/>
				{state.activeVolume && (
					<input
						onChange={changeVolume}
						value={musicInfo.volume}
						type='range'
						step={0.01}
						min={0}
						max={1}
					/>
				)}
			</div>
		</Container>
	)
}

export default MusicPlayer
