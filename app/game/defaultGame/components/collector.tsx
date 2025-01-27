"use client";
import GameField from "./gameField/gameField";
import { useState } from "react";

export default function Collector() {
    const [isNeedAwaitCircle, setIsNeedAwaitCircle] = useState<boolean>(false);
    return (
        <main>
            {isNeedAwaitCircle ? (
                <div className="fixed w-screen h-screen bg-popup top-0 left-0">
                    <div className="w-52 h-10 m-auto mt-80 flex justify-between">
                        <div className="w-10 bg-white rounded-1/2 animate-firstCircle"></div>
                        <div className="w-10 bg-white rounded-1/2 animate-secondCircle"></div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <GameField setIsNeedAwaitCircle={setIsNeedAwaitCircle}/>
        </main>
    );
}
