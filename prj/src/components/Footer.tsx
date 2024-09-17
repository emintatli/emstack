import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="footer bg-neutral text-neutral-content grid-rows-2 p-10">
            <nav>
                <h6 className="footer-title">Ai Tools</h6>
                <Link
                    title="Ai Art Generator"
                    href="/"
                    className="link link-hover"
                >
                    Ai Art Generator
                </Link>
                <Link
                    title="Ai Tattoo Generator"
                    href="/ai-tattoo-generator"
                    className="link link-hover"
                >
                    Ai Tattoo Generator
                </Link>
                <Link
                    title="Free Ai Art Generator"
                    href="/free-ai-art-generator"
                    className="link link-hover"
                >
                    Free Ai Art Generator
                </Link>
            </nav>
        </footer>
    )
}

export default Footer
