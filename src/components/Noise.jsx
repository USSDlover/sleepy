import React, {useEffect, useState} from 'react';

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
        <>
            <h3>{name}</h3>
            <button onClick={handlePlaying}>{playing ? 'Pause' : 'Play'}</button>
            <button onClick={handleAutoRepeat}>{loop ? 'Auto repeat' : 'Play once'}</button>
            <progress max={audio.duration} value={currentTime} />
        </>
    )
}
