'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useAuth } from '@/context/context'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { config } from '../../../config'

export default function Dashboard() {
    const router = useRouter()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, loading])

    if (loading || user) {
        return <></> // or a loading spinner
    }

    return (
        <Card className="mx-auto max-w-sm mt-20">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {/* <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button> */}
                    <Link href={config.be_url + '/auth/google'}>
                        <Button variant="outline" className="w-full">
                            <FcGoogle size={'20'} className="mr-2" /> Login with
                            Google
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
