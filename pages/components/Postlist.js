import Link from 'next/link';
import { useEffect, useState } from 'react';

// REMOVED .split() entirely
const truncateText = (text, charLimit) => {
    // 1. Safety check for null/undefined/non-strings
    if (!text || typeof text !== 'string') return '';

    // 2. Use substring instead of split/join
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + '...';
    }

    return text;
};

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/posts');
                const data = await response.json();

                // Safety check for the array from API
                setPosts(data.posts || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className='posts'>
            <div className='section_wrapper container'>
                <div className='SecTitle'>
                    <h2>Posts</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className='posts_div'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : posts.length === 0 ? (
                        <p>No posts found.</p>
                    ) : (
                        <ul className='posts_ul'>
                            {posts.map((post) => (
                                <li className='posts_lists' key={post.id}>
                                    <h2>{post.title || "Untitled"}</h2>

                                    {/* Using 100-150 characters is usually best for previews */}
                                    <p>{truncateText(post.body, 120)}</p>

                                    <Link href={`post/${post.id}`}>
                                        Read More
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blog;