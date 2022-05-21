import React from 'react';
import { createRoot } from 'react-dom/client';

import './app.css'

const App = () => {
    return (
        <div className={["app"].join(" ")}>
            <h1>
            Yes, here! version0.11
            </h1>
        </div>
    )
}

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);