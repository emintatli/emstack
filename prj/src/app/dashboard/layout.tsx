'use client'
import { ReactNode } from 'react'
import { useAuth } from '@/context/context'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaPowerOff } from "react-icons/fa";
import { ExpandableMenuItem } from '@/components/Expandable'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, loading, logout } = useAuth()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        )
    }

    if (!user) {
        redirect('/auth')
    }

    return (
        <div className="drawer lg:drawer-open bg-gray-900 text-gray-100">
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-gray-800 shadow-md">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="dashboard-drawer"
                            className="btn btn-square btn-ghost text-gray-300 hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-semibold">
                        Dashboard
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal  flex items-center justify-center">
                            <li>
                                <div className="text-gray-300 hover:text-white">
                                    {user.email}
                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="btn btn-xs btn-outline btn-error"
                                >
                                    <FaPowerOff /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Page content */}
                <main className="flex-grow p-6 bg-zinc-100 text-black">
                    {children}
                </main>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 h-full bg-gray-800 text-gray-100">
                    <li className="mb-4 font-bold text-2xl text-blue-400">
                        404bots
                    </li>
                    <li>
                        <Link
                            href="/dashboard"
                            className="py-2 hover:bg-gray-700 rounded-lg focus:text-inherit"
                        >
                            Overview
                        </Link>
                    </li>
                    <ExpandableMenuItem
                        label="Users"
                        items={[
                            {
                                href: '/dashboard/users/list',
                                label: 'User List',
                            },
                            {
                                href: '/dashboard/users/roles',
                                label: 'User Roles',
                            },
                        ]}
                    />
                    <ExpandableMenuItem
                        label="Settings"
                        items={[
                            {
                                href: '/dashboard/settings/general',
                                label: 'General',
                            },
                            {
                                href: '/dashboard/settings/security',
                                label: 'Security',
                            },
                        ]}
                    />
                </ul>
            </div>
        </div>
    )
}
