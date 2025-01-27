'use client'
import { useEffect, useState, SetStateAction } from 'react';

interface recs {
    setIsNeedAwait: React.Dispatch<SetStateAction<boolean>>
}

export default function Records({setIsNeedAwait}: recs) {
    const [defaultRecord, setDefaultRecord] = useState<string>('')
    useEffect(() => {
        async function fetchRecords() {
            setIsNeedAwait(true)
            const response = await fetch('/queries/cookieDecryptor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (response.ok) {
                const result = await response.json()
                setDefaultRecord(result.message[0].default_record)
            }
            setIsNeedAwait(false)
        }

        fetchRecords()
    }, [])
    
    return (
        <section className=''>
            <ul>
                <li>
                    <p>Default game record: </p>
                    <p>{defaultRecord}</p>
                </li>
            </ul>
        </section>
    )
}