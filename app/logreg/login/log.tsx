'use client'
import { montserrat } from "@/app/fonts";
import { FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

interface log {
    setResCode: React.Dispatch<SetStateAction<string>>
    setIsNeedResCode: React.Dispatch<SetStateAction<boolean>>
}

export default function Login({setResCode, setIsNeedResCode}: log) {
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function loginHandler(e: FormEvent) {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/queries/loginHandler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
        if (!(response.ok)) {
            const res = await response.json()
            setResCode(res.message)
            setIsNeedResCode(true)
            setTimeout(() => setIsNeedResCode(false), 5000)
        } else {
            router.push('../')
        }
    }

    return (
        <form action="" onSubmit={loginHandler} className="w-1/6 m-auto">
            <div className="text-white flex flex-col gap-5 justify-center">
                <div className="flex flex-col gap-1"> 
                    <label htmlFor="logusername" className={`${montserrat.className}`}>Введите имя</label>
                    <input
                        type="text"
                        name="logusername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="logusername"
                        className="bg-second p-2 outline-none border border-second transition-all duration-300 hover:border-sixth focus:border-sixth"
                        required
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="logpassword" className={`${montserrat.className}`}>Введите пароль</label>
                    <input
                        type="password"
                        name="logpassword"
                        id="logpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-second p-2 outline-none border border-second transition-all duration-300 hover:border-sixth focus:border-sixth"
                        required
                    />
                </div>
                <input type="submit" value={'Войти'} className="bg-second self-center px-10 py-2 transition-all duration-500 hover:bg-lighten-second"/>
            </div>
        </form>
    );
}
