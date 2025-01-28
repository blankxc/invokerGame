'use client'

export default function List() {
    return (
        <section>
            <ul className="bg-second h-full">
                <Item text="Default game" isActive={true}/>
                <Item text="Time limit game"/>
            </ul>
        </section>
    )
}

function Item({text, isActive}: {text: string, isActive?: boolean}) {
    return (
                <li className={`bg-fifth p-2 ${isActive ? 'bg-third' : ''}`}>
                    <button>
                        {text}
                    </button>
                </li>
    )
}