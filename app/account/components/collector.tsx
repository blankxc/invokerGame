"use client";
import InputName from "./nameInput/input";
import InputMail from "./mailInput/input";
import InputPassword from "./passwordInput/input";
import Records from "./records/records";
import { useState } from "react";

export default function Collector() {
    const [changesResCode, setChangesResCode] = useState<string>("");
    const [isNeedChangesResCode, setIsNeedChangesResCode] =
        useState<boolean>(false);
    const [isNeedAwaitCircle, setIsNeedAwaitCircle] = useState<boolean>(false);
    return (
        <section className="h-main pt-6">
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
            <div className="w-4/6 m-auto flex gap-6 flex-col">
                <div className="border-b pb-6 border-fifth">
                    <InputName
                        setChangesCode={setChangesResCode}
                        setIsNeedRes={setIsNeedChangesResCode}
                        setIsNeedAwait={setIsNeedAwaitCircle}
                    />
                </div>
                <div className="border-b pb-6 border-fifth">
                    <InputMail
                        setChangesCode={setChangesResCode}
                        setIsNeedRes={setIsNeedChangesResCode}
                        setIsNeedAwait={setIsNeedAwaitCircle}
                    />
                </div>
                <div>
                    <InputPassword
                        setIsNeedRes={setIsNeedChangesResCode}
                        setChangesCode={setChangesResCode}
                        setIsNeedAwait={setIsNeedAwaitCircle}
                    />
                </div>
                <div className="text-white ">
                    <Records setIsNeedAwait={setIsNeedAwaitCircle} />
                </div>
            </div>
            {isNeedChangesResCode ? (
                <div className="absolute bottom-28 left-1/2 text-white -translate-x-1/2 bg-sixth p-2">
                    {changesResCode}
                </div>
            ) : (
                ""
            )}
        </section>
    );
}
