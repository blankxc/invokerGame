"use client";
import { montserrat } from "@/app/fonts";
import { useState, useEffect, FormEvent, SetStateAction } from 'react';

interface input {
    setIsNeedRes: React.Dispatch<SetStateAction<boolean>>
    setChangesCode: React.Dispatch<SetStateAction<string>>
    setIsNeedAwait: React.Dispatch<SetStateAction<boolean>>
}


export default function InputName({setIsNeedRes, setChangesCode, setIsNeedAwait}:input) {
    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string>('')

     async function getUserData() {
            const response = await fetch("/queries/cookieDecryptor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
                const d = await response.json();
                return d.message
        }

    useEffect(() => {
        async function fetchData() {
            setIsNeedAwait(true)
            const result = await getUserData()
            setUsername(result[0].username || '')
            setUserId(result[0].id)
            setIsNeedAwait(false)
        }
        
        fetchData();
    }, []);
    
    async function changeUsername(e: FormEvent) {
        e.preventDefault()
        setIsNeedAwait(true)
        
        const response = await fetch('/queries/updateAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: username, param: 'username', id: userId})
        })        
        if (response.ok) {
            const data = await response.json()
            setChangesCode(data.message)
            setIsNeedRes(true)
            setTimeout(() => setIsNeedRes(false), 5000)
        }
        setIsNeedAwait(false)
        }

    return (
        <form onSubmit={changeUsername} action="" className={`w-2/6 text-white ${montserrat.className} flex items-end gap-16 `}>
            <div className="flex flex-col gap-5 w-screen" >
                <label htmlFor="username">Ваше имя</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="bg-transparent border-b transition-all outline-none duration-500 hover:border-third focus:border-third"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <input type="submit" value={'Принять'} className="bg-third text-black font-medium p-2 transition-all duration-500 hover:bg-fifth"/>
        </form>
    );
}
