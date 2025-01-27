'use client'
import { useState } from 'react';

export default function List() {
    return (
        <section>
            <ul className="bg-second h-full">
                <Item text="Default game"/>
                <Item text="Time limit game"/>
            </ul>
        </section>
    )
}

function Item({text}: {text: string}) {
    return (
                <li className={`bg-fifth p-2`}>
                    <button>
                        {text}
                    </button>
                </li>
    )
}