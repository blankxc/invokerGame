import Link from "next/link";

export default function Home() {
    return (
        <>
            <section>
                <ul className="w-1/2 m-auto text-center text-third mt-80">
                    <li className="bg-second p-3 transition-all duration-500 border border-second hover:border-third">
                        <Link href={"./game/defaultGame"}>Default game</Link>
                    </li>
                </ul>
            </section>
        </>
    );
}
