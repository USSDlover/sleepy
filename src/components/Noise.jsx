import React, {useEffect, useState} from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import LoopIcon from '@mui/icons-material/Loop';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

const buttonClassName = "bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center";

function PlayButton({ clickHandler, playing }) {
    if (playing) {
        return <button
            onClick={clickHandler}
            type="button"
            className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none w-10 h-10 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
        >
            <PauseIcon />
        </button>;
    } else {
        return <button onClick={clickHandler} type="button" className={buttonClassName} aria-label="Play">
            <PlayArrowIcon />
        </button>
    }
}

function RepeatButton({ clickHandler, autoRepeat }) {
    if (autoRepeat) {
        return <button onClick={clickHandler} type="button" className={buttonClassName} aria-label="Auto repeat"
        >
            <LoopIcon />
        </button>
    } else {
        return <button onClick={clickHandler} type="button" className={buttonClassName} aria-label="Play once">
            <RepeatOneIcon />
        </button>
    }
}

export function Noise({ name, sound }) {
    const [audio] = useState(new Audio(sound));
    const [playing, setPlaying] = useState(false);
    const [loop, setLoop] = useState(false);
    const [currentTime, setCurrentTime] = useState(5);
    const [repeatEnd] = useState(audio.duration - 5);

    useEffect(() => {
        if (playing) {
            audio.play().then();
            audio.loop = loop;
        } else {
            audio.pause();
        }
    }, [playing, loop, audio]);

    useEffect(() => {
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        }
    });

    const handlePlaying = () => {
        setPlaying(!playing);
    }

    const handleAutoRepeat = () => {
        setLoop(!loop);
    }

    const handleTimeUpdate = () => {
        if (loop && audio.currentTime >= repeatEnd) {
            // Reset the audio to the starting point when reaching the repeatEnd
            audio.currentTime = currentTime;
        } else {
            setCurrentTime(audio.currentTime);
        }
    }

    if (!name || !sound) {
        return <strong>The sound and name are required</strong>;
    }

    return (
        <div className="flex flex-col gap-4 py-3 px-2 max-w-sm border-b-2 shadow">
            <h3 className="text-2xl font-bold">{name}</h3>
            <progress max={audio.duration} value={currentTime} />
            <div className="self-end flex gap-2 items-center">
                <PlayButton clickHandler={handlePlaying} playing={playing} />
                <RepeatButton clickHandler={handleAutoRepeat} autoRepeat={loop} />
            </div>
        </div>
    )
}
