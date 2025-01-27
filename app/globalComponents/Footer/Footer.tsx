import Link from "next/link";
export default function Footer() {
    return (
        <footer className="text-white text-center border-t border-third p-4 bg-main-900">
            <p>
                © 2025 <Link href="https://github.com/blankxc" className="hover:underline">blankxc</Link>.
            </p>
            <p>
                <Link href="https://github.com/blankxc/invokerGame/blob/master/LICENSE.txt" className="hover:underline">
                    MIT License
                </Link>
            </p>
        </footer>
    );
}
