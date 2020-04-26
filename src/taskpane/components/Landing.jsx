import React, { useState, useEffect } from "react";
import Kudos from "./KUDOS.jsx";

export default function Landing() {
    const ready = false

    if (ready) {
        return (
            <Kudos />
        )
    } else {
        <main className="ms-welcome__main">
            <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20 centered">Coming Soon!</h2>
        </main>
    }
    
}