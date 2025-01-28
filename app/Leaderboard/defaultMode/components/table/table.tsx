"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function LeadersTable() {
    interface leaders {
        username: string,
        score: string,
    }
    const [leaders, setLeaders] = useState<leaders[]>([])
    useEffect(() => {
        async function getLeaders() {
            const response = await fetch("/queries/getRecord", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await response.json()
            setLeaders([])
            console.log(res.message)
            res.message.map((item: resItem) => {
                setLeaders((prev) => {
                    const newArr = [...prev, {username: item.username, score: item.default_record}]
                    return newArr
                })
            })
        }
        getLeaders();
    }, []);

    interface resItem{
        default_record: string,
        id: number,
        mail: string,
        password: string,
        username: string
    }

    useEffect(() => {
        console.log(leaders)
    }, [leaders])

    return (
        <section className="w-5/6 mx-auto pt-5">
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <Th text="№" />
                        <Th text="username" />
                        <Th text="score" />
                    </tr>
                </thead>
                <tbody>
                    {
                    leaders.map((item, index) => {
                        return <Tr key={index} index={++index} user={item.username} record={item.score}/>
                    })
                    }
                </tbody>
            </table>
        </section>
    );
}

interface th {
    text: string;
}

interface tr {
    index: number,
    user: string,
    record: string
}

function Th({ text }: th) {
    return <th className="bg-sixth py-2">{text}</th>;
}

function Tr({ index, user, record}: tr) {
    return (
        <tr className="border-b">
            <td className="p-4 py-6 bg-seventh transition duration-300 hover:bg-sixth">{index}</td>
            <td className="p-4 py-6 bg-eighth transition duration-300 hover:bg-sixth">{user}</td>
            <td className="p-4 py-6 bg-seventh transition duration-300 hover:bg-sixth">{record}</td>
        </tr>
    );
}
