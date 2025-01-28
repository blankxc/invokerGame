"use client";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { spellsCombinations } from "./combinations";

interface game {
    setIsNeedAwaitCircle: React.Dispatch<SetStateAction<boolean>>;
}

export default function GameField({ setIsNeedAwaitCircle }: game) {
    const [isGameActive, setIsGameActive] = useState<boolean>(false);
    const focusElRef = useRef<HTMLDivElement | null>(null);
    const [spheres, setSpheres] = useState<string[]>(["plug", "plug", "plug"]);
    const [spells, setSpells] = useState<string[]>(["plug", "plug"]);
    const [score, setScore] = useState<number>(0);
    const [isNeedFinally, setIsNeedFinally] = useState<boolean>(false);
    const [record, setRecord] = useState<number>(0);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        async function getUserRecord() {
            setIsNeedAwaitCircle(true);
            const response = await fetch("/queries/cookieDecryptor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                const result = data.message;
                setRecord(+result[0].default_record);
                setUserId(result[0].id);
            }
            setIsNeedAwaitCircle(false);
        }
        getUserRecord();
    }, [record, setIsNeedAwaitCircle]);

    const scoreRef = useRef<number>(0);

    function gameRules() {
        setIsNeedFinally(false);
        setScore(0);
        focusElRef.current?.focus();
        setIsGameActive(true);
        gameTimer();
        randomizer();
    }

    function gameTimer() {
        setTimeout(gameEnd, 30000);
    }

    async function gameEnd() {
        setIsGameActive(false);
        setSpheres(["plug", "plug", "plug"]);
        const finalRecord = scoreRef.current;
        setSpells(["plug", "plug"]);
        setRecord(+record);
        if (finalRecord > record) {
            const response = await fetch("/queries/updateRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, record: finalRecord }),
            });
            if (response.ok) {
                setRecord(finalRecord);
            }
        }
        setCurrentRandomSpell("");
        setGuessedWord(0);
        setIsNeedFinally(true);
    }

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

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

    const [currentRandomSpell, setCurrentRandomSpell] = useState<string>("");
    const [guessedWord, setGuessedWord] = useState<number>(0);

    function randomizer(): void {
        const randomNumber = Math.floor(
            Math.random() * randomSpellsStartState.length
        );
        if (guessedWord !== randomNumber) {
            setCurrentRandomSpell(randomSpellsStartState[randomNumber]);
            setGuessedWord(randomNumber);
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
            setIsNeedFirstAnim(true);
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
            setIsNeedSecondAnim(true);
            setSpheres((prev) => {
                return ["Wex", ...prev];
            });
        }
        if (
            currentKey === "e" ||
            currentKey === "E" ||
            currentKey === "у" ||
            currentKey === "У"
        ) {
            setIsNeedThirdAnim(true);
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
                setIsNeedFourthAnim(true);
                setScore((current) => current + 1);
                randomizer();
            }
        }
        if (
            currentKey === "f" ||
            currentKey === "F" ||
            currentKey === "а" ||
            currentKey === "А"
        ) {
            if (spells[1] === currentRandomSpell) {
                setIsNeedFifthAnim(true);
                setScore((current) => current + 1);
                randomizer();
            }
        }
    }

    // useEffect(() => {
    //     window.addEventListener('keydown', function(e) {
    //         if ((e.key === '~' || e.key === '`' || e.key === 'ё' || e.key === 'Ё') && isGameActive === false) {
    //             gameRules()
    //         }
    //     })
    // }, [])

    useEffect(() => {
        const imagesToPreload: string[] = [
            "/Invoke_icon.webp",
            "/skills/alacrity.webp",
            "/skills/chaos_meteor.webp",
            "/skills/cold_snap.webp",
            "/skills/deafening_blast.webp",
            "/skills/EMP.webp",
            "/skills/forge_spirit.webp",
            "/skills/ghost_walk.webp",
            "/skills/ice_wall.webp",
            "/skills/Invoke_icon.webp",
            "/skills/plug.webp",
            "/skills/sun_strike.webp",
            "/skills/tornado.webp",
            "/spheres/exort.webp",
            "/spheres/Wex.webp",
            "/spheres/quas.webp",
            "/spheres/plug.webp",
        ];

        imagesToPreload.forEach((srcc) => {
            const img: HTMLImageElement = new window.Image();
            img.src = srcc;
        });
    }, []);

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

    const [isNeedFirstAnim, setIsNeedFirstAnim] = useState<boolean>(false);
    const [firstClass, setFirstClass] = useState<string>('')
    if (isNeedFirstAnim) {
        setIsNeedFirstAnim(false)
        setFirstClass('animate-trueSphere')
        setTimeout(() => {
            setFirstClass('')
        },200)
    }
    const [isNeedSecondAnim, setIsNeedSecondAnim] = useState<boolean>(false);
    const [secondClass, setSecondClass] = useState<string>('')
    if (isNeedSecondAnim) {
        setIsNeedSecondAnim(false)
        setSecondClass('animate-trueSphere')
        setTimeout(() => {
            setSecondClass('')
        },200)
    }
    const [isNeedThirdAnim, setIsNeedThirdAnim] = useState<boolean>(false);
    const [thirdClass, setThirdClass] = useState<string>('')
    if (isNeedThirdAnim) {
        setIsNeedThirdAnim(false)
        setThirdClass('animate-trueSphere')
        setTimeout(() => {
            setThirdClass('')
        },200)
    }
    const [isNeedFourthAnim, setIsNeedFourthAnim] = useState<boolean>(false);
    const [fourthClass, setFourthClass] = useState<string>('')
    if (isNeedFourthAnim) {
        setIsNeedFourthAnim(false)
        setFourthClass('animate-trueSphere')
        setTimeout(() => {
            setFourthClass('')
        },200)
    }
    const [isNeedFifthAnim, setIsNeedFifthAnim] = useState<boolean>(false);
    const [fifthClass, setFifthClass] = useState<string>('')
    if (isNeedFifthAnim) {
        setIsNeedFifthAnim(false)
        setFifthClass('animate-trueSphere')
        setTimeout(() => {
            setFifthClass('')
        },200)
    }

    return (
        <section className="text-white w-1/2 m-auto mt-64 mb-64">
            <p
                className={`text-center mb-20 text-xl transition-all duration-500 ${
                    isNeedFinally
                        ? "absolute left-1/2 -translate-x-1/2 translate-y-32 scale-150"
                        : ""
                }`}>
                {score}
            </p>
            <p>record: {record}</p>
            <div
                className={`flex flex-col items-center transition-all duration-200 ${
                    isNeedFinally ? "translate-y-96 opacity-0 z-0" : ""
                }`}>
                <div className="bg-second">
                    <Image
                        src={`/skills/${
                            currentRandomSpell
                                ? currentRandomSpell
                                : "Invoke_icon"
                        }.webp`}
                        alt=""
                        width={100}
                        height={100}
                        unoptimized
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
                    onKeyDown={(e) =>
                        isGameActive ? keydownHandler(e.key) : ""
                    }>
                    <div className="pb-4">
                        <Image
                            src={`/spheres/${spheres[0]}.webp`}
                            alt={""}
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div
                            className={`w-full m-auto h-1 bg-third ${firstClass} self-end`}></div>
                    </div>
                    <div className="pb-4 relative">
                        <Image
                            src={`/spheres/${spheres[1]}.webp`}
                            alt={""}
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div className={`w-full h-1 m-auto bg-third ${secondClass}`}></div>
                    </div>
                    <div className="pb-4 relative">
                        <Image
                            src={`/spheres/${spheres[2]}.webp`}
                            alt={""}
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div className={`w-full h-1 m-auto bg-third ${thirdClass}`}></div>
                    </div>
                    <div className="pb-4 relative">
                        <Image
                            src={`/skills/${spells[0]}.webp`}
                            alt={""}
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div className={`w-full h-1 m-auto bg-third ${fourthClass}`}></div>
                    </div>
                    <div className="pb-4 relative">
                        <Image
                            src={`/skills/${spells[1]}.webp`}
                            alt={""}
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                        <div className={`w-full h-1 m-auto bg-third ${fifthClass}`}></div>
                    </div>
                    <div className="pb-4">
                        <Image
                            src="/Invoke_icon.webp"
                            alt=""
                            className="pb-4"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            {isGameActive ? (
                ""
            ) : (
                <button
                    className="block m-auto bg-second border border-second px-10 py-2 mt-5 transition-all duration-500 hover:border-third hover:rounded-2xl rounded"
                    onClick={gameRules}>
                    play
                </button>
            )}
        </section>
    );
}
