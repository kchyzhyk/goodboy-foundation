import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-gray-900">
                    🐕 GoodBoy
                </Link>
                <div className="flex gap-6">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                        Domov
                    </Link>
                    <Link href="/kontakt" className="text-gray-600 hover:text-gray-900 transition">
                        Kontakt
                    </Link>
                </div>
            </nav>
        </header>
    );
}
