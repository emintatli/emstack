import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import Client from '@/components/Client'


const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dreapic Ai - The best place to find your dream pictures',
    description:
        'Dreapic Ai is the best place to find your dream pictures. We have a wide range of pictures to choose from. You can find pictures of nature, animals, people, and more. Our pictures are high quality and free to use. You can use them for your personal or commercial projects. We update our collection regularly, so you can always find something new and interesting. Visit Dreapic Ai today and find your dream pictures!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                <Client />
                {children}
            </body>
        </html>
    )
}
