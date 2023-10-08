import React from 'react';
import packageJson from '../../package.json';

export function Footer() {
    return <footer className="w-full h-10 flex items-center ps-3 bg-black text-amber-50">
        <p>Sleepy! <span className="text-sm">v{packageJson.version}</span></p>
    </footer>
}