import FAQ from '@/components/Faq'
import Footer from '@/components/Footer'

import { LeadingImageLeft, LeadingImageRight } from '@/components/Leading'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Ai Art Generator - Create Stunning Art with Dreapic',
    description:
        "Dreapic's AI art generator lets you create stunning digital artwork from text prompts. Transform your ideas into beautiful images with advanced machine learning.",
}

const faqs = [
    {
        question: 'What is Dreapic?',
        answer: 'Dreapic is an AI-powered art generation website that allows users to create unique digital artwork using advanced machine learning algorithms.',
    },
    {
        question: 'How does Dreapic work?',
        answer: 'Users input text prompts or upload reference images, and our AI system generates original artwork based on these inputs, blending various styles and techniques.',
    },
    {
        question: 'Is Dreapic free to use?',
        answer: 'Dreapic offers a free tier with limited features. We also have premium subscriptions that provide access to advanced tools, higher resolution outputs, and more generations per month.',
    },
    {
        question: 'Can I use Dreapic-generated images commercially?',
        answer: 'Yes, all artwork generated through our premium plans comes with a commercial use license. Free tier generations are for personal use only.',
    },
    {
        question: 'How long does it take to generate an image?',
        answer: 'Generation times vary depending on complexity and server load, but most images are ready within 30 seconds to 2 minutes.',
    },
    {
        question: 'What image formats does Dreapic support?',
        answer: 'Dreapic generates images in PNG format. Users can also download their creations in JPEG or WebP formats.',
    },
    {
        question: 'Can I edit or refine the generated images?',
        answer: 'Yes, Dreapic offers basic editing tools and the ability to regenerate specific parts of an image. Premium users have access to more advanced editing features.',
    },
    {
        question: 'Is there a mobile app for Dreapic?',
        answer: "Currently, Dreapic is a web-based platform optimized for mobile browsers. We're working on dedicated iOS and Android apps to be released in the near future.",
    },
    {
        question:
            'How does Dreapic ensure originality and avoid copyright issues?',
        answer: 'Our AI models are trained on a diverse range of public domain and licensed artworks. The system generates new, original pieces rather than reproducing existing art.',
    },
    {
        question: 'Can I collaborate with other users on Dreapic?',
        answer: "Yes, Dreapic offers a collaboration feature where users can share projects, iterate on each other's work, and create art collectively.",
    },
]

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <div className="container mx-auto mt-10 p-2 flex items-center flex-col">
                    <div className="w-full">
                        <LeadingImageLeft
                            title="AI Image Generator from Text"
                            description="Transform your ideas into stunning visuals with our cutting-edge AI Image Generator from Text. This powerful tool harnesses advanced machine learning algorithms to create unique, high-quality images based on your written descriptions."
                            buttonLink="/"
                            buttonText="Try Now"
                            imageAlt="ai art generator"
                            imageSrc="/main/0.jpg"
                        />
                        <LeadingImageRight
                            title="AI Tattoo Generator"
                            description="Create unique, personalized tattoo designs instantly with our AI Tattoo Generator. Explore endless styles, customize your perfect ink, and visualize your dream tattoo before committing. Turn your ideas into stunning, one-of-a-kind body art with cutting-edge AI technology."
                            buttonLink="/ai-tattoo-generator"
                            buttonText="Try Now"
                            imageAlt="ai art generator"
                            imageSrc="/tattoo/1.jpg"
                        />
                        <LeadingImageLeft
                            title="Free Ai Art Generator from Text"
                            description="Unleash your creativity with our Free AI Art Generator from Text. Simply describe your vision, and our advanced AI system will bring it to life in seconds. No artistic skills required – just let your imagination run wild and watch your ideas come to life."
                            buttonLink="/free-ai-art-generator"
                            buttonText="Try Now"
                            imageAlt="free ai art generator"
                            imageSrc="/main/4-min.webp"
                        />
                    </div>
                    <div className="w-full">
                        <FAQ faqs={faqs} />
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2">
                        <Link href="/">
                            <div className="card card-side bg-base-100 shadow-xl my-5 mx-2 md:mx-5">
                                <div className="card-body">
                                    <h2 className="card-title text-3xl flex items-center">
                                        <span className="text-5xl mb-2">
                                            👑
                                        </span>{' '}
                                        Try Premium
                                    </h2>
                                    <p>
                                        <b>No Queues</b>,Much more features,
                                        <b>4K</b> resolution and more
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link href="/blog">
                            <div className="card card-side bg-base-100 shadow-xl my-5 mx-2 md:mx-5">
                                <div className="card-body">
                                    <h2 className="card-title text-3xl flex items-center">
                                        <span className="text-5xl mb-2">
                                            📖
                                        </span>{' '}
                                        Blog
                                    </h2>
                                    <p>
                                        Read about the latest updates and
                                        features on Dreapic's blog
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
