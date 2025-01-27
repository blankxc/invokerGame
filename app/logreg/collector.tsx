"use client";
import { useState } from "react";
import Registration from "./registration/reg";
import Login from "./login/log";
import Link from "next/link";
export default function Collector() {
    const [isNeedReg, setIsNeedReg] = useState<boolean>(false);
    const [resCode, setResCode] = useState<string>('')
    const [isNeedAwaitCircle, setIsNeedAwaitCircle] = useState<boolean>(false);
    const [isNeedRes, setIsNeedRes] = useState<boolean>(false)
    return (
        <section className="h-main pt-64">
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
            {isNeedReg ? (
                <Registration setIsNeedAwaitCircle={setIsNeedAwaitCircle} setResCode={setResCode} setIsNeedRes={setIsNeedRes}/>
            ) : (
                <Login setResCode={setResCode} setIsNeedResCode={setIsNeedRes}/>
            )}
            <div className="text-center flex flex-col gap-2 text-white pt-4">
                <button onClick={() => setIsNeedReg(!isNeedReg)}>
                    {isNeedReg ? "Войти" : "Зарегестрироваться"}
                </button>
                <Link href={"#"}>Сменить пароль</Link>
            </div>
            {isNeedRes ? 
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-white bg-purple-600 p-5">{resCode}</div>
            : ''
        }
        </section>
    );
}
