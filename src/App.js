import React from 'react';
import { Noise } from './components/Noise';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="h-full">
            <main className="h-full px-5 pt-2.5">
                <Noise name={'River'} sound={'/River.mp3'}/>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
