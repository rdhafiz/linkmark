import React from "react";
import ReactDOM from "react-dom/client";

export default function App(){
    return (
        <>
            <h1>Redishketch</h1>
        </>
    )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<App />)
