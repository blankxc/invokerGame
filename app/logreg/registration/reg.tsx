'use client'
import { montserrat } from "@/app/fonts";
import { FormEvent, SetStateAction, useState } from 'react';

interface reg {
    setIsNeedAwaitCircle: React.Dispatch<SetStateAction<boolean>>
    setResCode: React.Dispatch<SetStateAction<string>>
    setIsNeedRes: React.Dispatch<SetStateAction<boolean>>
}

export default function Registration({setIsNeedAwaitCircle, setResCode, setIsNeedRes}: reg) {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    async function submitHandler(e: FormEvent) {
        e.preventDefault()
        setIsNeedAwaitCircle(true)
        const response = await fetch('/queries/checkUsernames/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password, mail: mail})
        })
        const result = await response.json()
        setIsNeedAwaitCircle(false)
        setResCode(result.message)
        setIsNeedRes(true)
        setTimeout(() => (setIsNeedRes(false)), 5000);
        }

    return (
        <form onSubmit={submitHandler} action="" className="w-1/6 m-auto">
            <div className="text-white flex flex-col gap-5 justify-center">
                <div className="flex flex-col gap-1">
                    <label htmlFor="regusername" className={`${montserrat.className}`}>Придумайте имя</label>
                    <input
                        type="text"
                        name="regusername"
                        id="regusername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-second p-2 outline-none border border-second transition-all duration-300 hover:border-sixth focus:border-sixth"
                        required
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="regpassword" className={`${montserrat.className}`}>Придумайте пароль</label>
                    <input
                        type="password"
                        name="regpassword"
                        id="regpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-second p-2 outline-none border border-second transition-all duration-300 hover:border-sixth focus:border-sixth"
                        required
                        />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="regmail" className={`${montserrat.className}`}>Введите электронную почту</label>
                    <input
                        type="mail"
                        name="regmail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        id="regmail"
                        className="bg-second p-2 outline-none border border-second transition-all duration-300 hover:border-sixth focus:border-sixth"
                        required
                    />
                </div>
                <input type="submit" value={"Зарегестрироваться"} className="bg-second self-center px-10 py-2 transition-all duration-500 hover:bg-lighten-second"/>
            </div>
        </form>
    );
}
