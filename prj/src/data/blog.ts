import axios from 'axios'
import { config } from '../../config'
export interface Post {
    id: number
    slug: string
    title: { rendered: string }
    content: { rendered: string }
    date: string
    excerpt: { rendered: string }
    _embedded: {
        'wp:featuredmedia'?: [{ source_url: string }]
    }
}

export async function getPosts(): Promise<Post[]> {
    let allPosts: Post[] = [];
    let page = 1;
    const perPage = 100; // Maximum allowed by WordPress REST API
    
    while (true) {
        const response = await axios.get<Post[]>(`${config.cms_api}/posts`, {
            params: {
                _embed: true,
                per_page: perPage,
                page: page
            }
        });
        
        const posts = response.data;
        allPosts = allPosts.concat(posts);
        
        // If we received fewer posts than requested, we've reached the end
        if (posts.length < perPage) {
            break;
        }
        
        page++;
    }
    
    return allPosts;
}