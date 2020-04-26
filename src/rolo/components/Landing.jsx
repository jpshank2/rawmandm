import React, { useState, useEffect } from "react";
import Rolo from "./ROLO.jsx";

export default function Landing() {
    const ready = false

    if (ready) {
        return (
            <Rolo />
        )
    } else {
        <main className="ms-welcome__main">
            <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20 centered">Coming Soon!</h2>
        </main>
    }
    
}