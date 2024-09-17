import { useState } from 'react'
import Link from 'next/link'

interface MenuItem {
    href: string
    label: string
}

interface ExpandableMenuItemProps {
    label: string
    items: MenuItem[]
}

export function ExpandableMenuItem({ label, items }: ExpandableMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <li>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="py-2 w-full text-left flex justify-between items-center hover:bg-gray-700 rounded-lg focus:outline-none focus:text-inherit"
            >
                {label}
                <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isExpanded && (
                <ul className="ml-4 mt-2 space-y-2">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.href} 
                                className="block py-2 px-4 hover:bg-gray-700 rounded-lg focus:outline-none focus:text-inherit"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}