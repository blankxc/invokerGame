"use client";
import { montserrat } from "@/app/fonts";
import { FormEvent, useState, useEffect, SetStateAction } from 'react';
import bcrypt from 'bcryptjs';

interface input {
    setIsNeedRes: React.Dispatch<SetStateAction<boolean>>
    setChangesCode: React.Dispatch<SetStateAction<string>>
    setIsNeedAwait: React.Dispatch<SetStateAction<boolean>>
}

export default function InputPassword({setIsNeedRes, setChangesCode, setIsNeedAwait}: input) {
    const [password, setPassword] = useState<string>('');

       const [userId, setUserId] = useState<string>('');
    
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
                console.log(result)
                setUserId(result[0].id || '')
                setIsNeedAwait(false)
            }
            
            fetchData();
        }, []);
        
        async function changePassword(e: FormEvent) {
            e.preventDefault()
            setIsNeedAwait(true)
            const hashedPassword = await bcrypt.hash(password, 10)
            const response = await fetch('/queries/updateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: hashedPassword, param: 'password', id: userId})
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
        <form action="" className={`w-2/6 text-white ${montserrat.className} flex items-end gap-16 `} onSubmit={changePassword}>
            <div className="flex flex-col gap-5 w-screen" >
                <label htmlFor="password">Ваш пароль</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-transparent border-b transition-all outline-none duration-500 hover:border-third focus:border-third"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <input type="submit" value={'Принять'} className="bg-third text-black font-medium p-2 transition-all duration-500 hover:bg-fifth"/>
        </form>
    );
}
