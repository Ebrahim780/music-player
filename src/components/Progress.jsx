import React from 'react'

const Progress = ({ musicInfo, setMusicInfo, currentMusic }) => {
	const dragHandler = e => {
		currentMusic.current.currentTime = e.target.value
		setMusicInfo({ ...musicInfo, currentTime: e.target.value })
	}

	const getTime = time => {
		return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
	}

	const takeAnimate = {
		transform: `translateX(${musicInfo.animationPercentage}%)`,
	}

	return (
		<div className='row justify-content-center align-items-center'>
			<p className='time-line'>{getTime(musicInfo.currentTime)}</p>
			<div className='progress col-lg-6 col-8 my-5'>
				<div
					className='track'
					style={{
						background: `linear-gradient(to right, cyan, teal)`,
					}}>
					<input
						type='range'
						min={0}
						max={musicInfo.duration || 0}
						id='progress-bar'
						value={musicInfo.currentTime}
						className='progress-bar'
						onChange={dragHandler}
					/>
					<div
						style={takeAnimate}
						className='animate-track'></div>
				</div>
			</div>
			<p className='time-line'>
				{musicInfo.duration ? getTime(musicInfo.duration) : '0:00'}
			</p>
		</div>
	)
}

export default Progress
