import React from "react";

export default function LeadersTable() {
    return (
    <section>
        <table className="">
            <thead>
                <tr>
                    <Th text="№"/>
                    <Th text="username"/>
                    <Th text="score"/>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Td text="1"/>
                    <Td text="admin"/>
                    <Td text="32"/>
                </tr>
                <tr>
                    <Td text="2"/>
                    <Td text="admin"/>
                    <Td text="32"/>
                </tr>
                <tr>
                    <Td text="3"/>
                    <Td text="admin"/>
                    <Td text="32"/>
                </tr>
            </tbody>
        </table>
    </section>
);
}

interface th {
    text: string
}

function Th({text}: th) {
    return (
        <th>{text}</th>
    )
}

function Td({text}: th) {
    return (
        <td className="p-4">{text}</td>
    )
}
