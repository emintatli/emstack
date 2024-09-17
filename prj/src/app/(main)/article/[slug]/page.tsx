import React from 'react'
import axios from 'axios'
import { Metadata } from 'next'
import { FaCalendar } from 'react-icons/fa'
import Link from 'next/link'
import Ad from '@/components/Ad'
import { getPosts, Post } from '@/data/blog'
import { config } from '../../../../../config'

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

async function getPostBySlug(slug: string): Promise<Post> {
    const response = await axios.get<Post[]>(
        `${config.cms_api}/posts?slug=${slug}&_embed`
    )
    return response.data[0]
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = await getPostBySlug(params.slug)
    return {
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
        openGraph: {
            title: post.title.rendered,
            description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
            images: [
                {
                    url:
                        post._embedded['wp:featuredmedia']?.[0]?.source_url ||
                        '',
                    width: 800,
                    height: 600,
                    alt: post.title.rendered,
                },
            ],
        },
    }
}

const pickRandom5InArray = (arr: Post[]) => {
    return arr.sort(() => Math.random() - Math.random()).slice(0, 5)
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const post = await getPostBySlug(params.slug)
    const allPosts = await getPosts()
    const randomPosts = pickRandom5InArray(allPosts)

    return (
        <div>
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-8">
                    <h1
                        className="text-4xl font-bold text-gray-900 mb-4 leading-tight"
                        dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                        }}
                    />
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                        <div className="flex items-center mr-6">
                            <FaCalendar className="mr-2" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}
                            </time>
                        </div>
                    </div>
                </header>

                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                    <img
                        src={
                            post._embedded['wp:featuredmedia']?.[0]?.source_url
                        }
                        alt={post.title.rendered}
                        style={{
                            objectPosition: 'center',
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>

                <div
                    className="prose prose-lg max-w-none article-content-main"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </article>
            <div className="my-4 container mx-auto">
                <Ad title="Just Imagine it. AI creates it." />
            </div>

            <div className="my-8 container mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Other Posts You Might Like
                </h2>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4">
                    {randomPosts.map((_post) => (
                        <Link href={`/article/${_post.slug}`} key={_post.id}>
                            <div className="flex-none w-64 snap-start bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <img
                                    src={
                                        _post._embedded['wp:featuredmedia']?.[0]
                                            ?.source_url
                                    }
                                    alt={_post.title.rendered}
                                    className="w-full h-40 object-cover"
                                />
                                <h3
                                    className="p-2 text-sm font-semibold text-gray-800 line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                        __html: _post.title.rendered,
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
