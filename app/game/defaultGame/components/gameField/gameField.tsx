"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { spellsCombinations } from "./combinations";

export default function GameField() {
    const [isGameActive, setIsGameActive] = useState<boolean>(false);
    const focusElRef = useRef<HTMLDivElement | null>(null);
    const [spheres, setSpheres] = useState<string[]>(["plug", "plug", "plug"]);
    const [spells, setSpells] = useState<string[]>(["plug", "plug"]);

    function gameRules() {
        focusElRef.current?.focus();
        setIsGameActive(true);
        gameTimer()
        randomizer()
    }

    function gameTimer() {
        setTimeout(gameEnd, 30000)
    }

    function gameEnd() {
        setIsGameActive(false);
        setSpheres(['plug', 'plug', 'plug'])
        setSpells(['plug', 'plug'])
        setCurrentRandomSpell('')
        setGuessedWord(0)
    }

    useEffect(() => {
        if (spheres.length > 3) {
            setSpheres((prev) => {
                const newArr = [...prev];
                newArr.splice(3, 4);
                return newArr;
            });
        }
    }, [spheres]);

    useEffect(() => {
        if (spells.length > 2) {
            setSpells((prev) => {
                const newArr = [...prev];
                newArr.splice(2, 3);
                return newArr;
            });
        }
    }, [spells]);

    const randomSpellsStartState: string[] = [
        "alacrity",
        "chaos_meteor",
        "cold_snap",
        "deafening_blast",
        "EMP",
        "forge_spirit",
        "ghost_walk",
        "ice_wall",
        "sun_strike",
        "tornado",
    ];

    const [currentRandomSpell, setCurrentRandomSpell] = useState<string>('')
    const [guessedWord, setGuessedWord] = useState<number>(0)

    function randomizer() {
        const randomNumber = Math.floor(Math.random() * randomSpellsStartState.length);
        if (guessedWord !== randomNumber) {
            setCurrentRandomSpell(randomSpellsStartState[randomNumber]);
            setGuessedWord(randomNumber)
        } else {
            randomizer();
        }
    }

    function keydownHandler(currentKey: string): void {
        if (
            currentKey === "q" ||
            currentKey === "Q" ||
            currentKey === "й" ||
            currentKey === "Й"
        ) {
            setSpheres((prev) => {
                return ["quas", ...prev];
            });
        }
        if (
            currentKey === "w" ||
            currentKey === "W" ||
            currentKey === "ц" ||
            currentKey === "Ц"
        ) {
            setSpheres((prev) => {
                return ["wex", ...prev];
            });
        }
        if (
            currentKey === "e" ||
            currentKey === "E" ||
            currentKey === "у" ||
            currentKey === "У"
        ) {
            setSpheres((prev) => {
                return ["exort", ...prev];
            });
        }
        if (
            currentKey === "r" ||
            currentKey === "R" ||
            currentKey === "к" ||
            currentKey === "К"
        ) {
            findCombination();
        }
        if (
            currentKey === "d" ||
            currentKey === "D" ||
            currentKey === "в" ||
            currentKey === "В"
        ) {
            if (spells[0] === currentRandomSpell) {
                randomizer()
            }
        }
        if (
            currentKey === "f" ||
            currentKey === "F" ||
            currentKey === "а" ||
            currentKey === "А"
        ) {
            if (spells[1] === currentRandomSpell) {
                randomizer()
            }
        }
    }

    function findCombination(): void {
        spellsCombinations.forEach((value, key) => {
            const isEqual: boolean = compareArrays(key, spheres);
            if (isEqual) {
                setSpells((prev) => {
                    return [value, ...prev];
                });
            }
        });
        function compareArrays(
            firstArr: string[],
            secondArr: string[]
        ): boolean {
            for (let i = 0; i < 3; i++) {
                if (!(firstArr[i] === secondArr[i])) {
                    return false;
                }
            }
            return true;
        }
    }

    return (
        <section className="text-white w-1/2 m-auto mt-60">
            <div className="flex flex-col items-center">
                <div className="bg-second">
                    <Image
                        src={`/skills/${currentRandomSpell ? currentRandomSpell : 'invoke_icon'}.webp`}
                        alt=""
                        width={100}
                        height={100}
                    />
                </div>
                <div
                    className={`${
                        isGameActive ? "time-bar-100" : "time-bar-0"
                    }`}></div>
                <div
                    className="flex gap-3 outline-none mt-10"
                    ref={focusElRef}
                    tabIndex={0}
                    onKeyDown={(e) => isGameActive ? keydownHandler(e.key) : ''}>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src={`/spheres/${spheres[0]}.webp`}
                            alt={""}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src={`/spheres/${spheres[1]}.webp`}
                            alt={""}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src={`/spheres/${spheres[2]}.webp`}
                            alt={""}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src={`/skills/${spells[0]}.webp`}
                            alt={""}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src={`/skills/${spells[1]}.webp`}
                            alt={""}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-b-4 border-third pb-4">
                        <Image
                            src="/invoke_icon.webp"
                            alt=""
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                {isGameActive ? '' : 
                <button
                className="bg-second border border-second px-10 py-2 mt-5 transitio-all duration-500 hover:border-third hover:rounded-2xl rounded"
                onClick={gameRules}>
                    play
                </button>
                }
            </div>
        </section>
    );
}
