import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import axios from 'axios'
import { notFound } from 'next/navigation'
import { config } from '../../../../../../config'

const WP_API_URL = config.cms_api

export const metadata: Metadata = {
  title: 'Dreapic Blog - AI, Generative Art, and More',
  description: 'Dreapic blog is a platform to share knowledge and experiences with the community. Here you can find articles on various topics about ai, generative art, and more.',
}

interface Post {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  date: string
  _embedded: {
    'wp:featuredmedia'?: [{ source_url: string }]
    'wp:term'?: [{ id: number; name: string; slug: string }[]]
  }
}

interface Category {
  id: number
  name: string
  slug: string
}

async function getPosts(category: string, page: number): Promise<{ posts: Post[], totalPages: number }> {
  const perPage = 18
  let url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}`

  if (category !== 'all') {
    const categoryId = await getCategoryId(category)
    if (categoryId) {
      url += `&categories=${categoryId}`
    }
  }

  const response = await axios.get<Post[]>(url, {
    validateStatus: (status) => status < 500,
  })

  if (response.status === 400) {
    return { posts: [], totalPages: 0 }
  }

  const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1')
  return { posts: response.data, totalPages }
}

async function getCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${WP_API_URL}/categories`)
  return response.data
}

async function getCategoryId(slug: string): Promise<number | null> {
  const response = await axios.get<Category[]>(`${WP_API_URL}/categories?slug=${slug}`)
  return response.data[0]?.id || null
}

export async function generateStaticParams() {
  const categories = await getCategories()
  const params = []

  for (const category of ['all', ...categories.map(c => c.slug)]) {
    for (let page = 1; page <= 5; page++) {
      params.push({ category, page: page.toString() })
    }
  }

  return params
}

export default async function BlogPage({ params }: { params: { category: string, page: string } }) {
  const currentPage = parseInt(params.page)
  const selectedCategory = params.category
  
  const { posts, totalPages } = await getPosts(selectedCategory, currentPage)
  const categories = await getCategories()

  if (posts.length === 0 && currentPage !== 1) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center justify-center flex-col mb-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Dreapic Posts</h1>
        <p className="text-center mb-4 w-full md:w-1/2">
          Dreapic blog is a platform to share knowledge and experiences with the community. 
          Here you can find articles on various topics about <b>ai</b>, <b>generative art</b>, and more.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/blog/all/1" className={`px-3 py-1 rounded ${selectedCategory === 'all' ? 'bg-pink-800 text-white' : 'bg-gray-200'}`}>
            All
          </Link>
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/blog/${category.slug}/1`}
              className={`px-3 py-1 rounded ${selectedCategory === category.slug ? 'bg-pink-800 text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Link href={`/article/${post.slug}`}>
              <div className="relative h-48">
                <img
                  src={post._embedded['wp:featuredmedia']?.[0]?.source_url}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-gray-600 mb-4 line-clamp-3" 
                     dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="text-pink-700 font-medium">Read more →</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/blog/${selectedCategory}/${page}`}
            className={`mx-1 px-3 py-2 rounded ${currentPage === page ? 'bg-pink-800 text-white' : 'bg-gray-200'}`}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  )
}