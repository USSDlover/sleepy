import React from 'react';
import './App.css';
import { Noise } from './components/Noise';
import packageJson from '../package.json';

function App() {
    return (
        <div>
            <h1>Welcome to white noise! v{packageJson.version}</h1>
            <Noise name={'River'} sound={'/River.mp3'} />
        </div>
    );
}

export default App;
