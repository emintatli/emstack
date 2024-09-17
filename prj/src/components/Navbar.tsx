'use client'
import React, { use } from 'react'
import { RiCopperCoinLine } from 'react-icons/ri'
type Props = {}
import { PiStarFourBold } from 'react-icons/pi'
import Link from 'next/link'
import { useAuth } from '@/context/context'
const Navbar = (props: Props) => {
    const state = useAuth((state) => state)

    return (
        <div className="navbar bg-base-100 px-8">
            <div className="flex-1">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Ai Tools</a>
                            <ul className="p-2">
                                <li>
                                    <Link href="/">Ai Art Generator</Link>
                                </li>
                                <li>
                                    <Link href="/ai-tattoo-generator">
                                        Ai Tattoo Generator
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/free-ai-art-generator">
                                        Free Ai Art Generator
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link title="blog" href="/blog">
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="flex gap-1 items-center ">
                    <PiStarFourBold className="text-2xl text-pink-800 animate-spin" />
                    <span className="flex items-center text-2xl  justify-center gap-1 cursor-pointer text-xl font-bold bg-gradient-to-r from-pink-800 via-pink-800 to-indigo-900 inline-block text-transparent bg-clip-text">
                        dreapic
                    </span>
                </Link>
            </div>
            <div className="navbar-start hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>Ai Tools</summary>
                            <ul className="p-2">
                                <li>
                                    <Link title="ai art generator" href="/">
                                        Ai Art Generator
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        title="ai tattoo generator"
                                        href="/ai-tattoo-generator"
                                    >
                                        Ai Tattoo Generator
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        title="free ai art generator"
                                        href="/free-ai-art-generator"
                                    >
                                        Free Ai Art Generator
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link href="/blog">Blog</Link>
                    </li>
                </ul>
            </div>
            <div className="dropdown dropdown-end flex gap-3">
                {/* <div>
                    <div className="badge badge-neutral cursor-pointer">
                        <RiCopperCoinLine className="mr-2" /> 6 Credit / Day
                    </div>
                </div> */}
                {state.user && (
                    <Link href="/dashboard" className="btn btn-primary btn-sm">
                        Dashboard
                    </Link>
                )}
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div
                        onClick={() => {
                            if (state.user) {
                                return
                            }
                            ;(document as any)
                                .getElementById('register_modal')
                                .showModal()
                        }}
                        className="w-10 rounded-full"
                    >
                        <img
                            alt="avatar"
                            src={state.user?.google?.picture || '/avatar.png'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
