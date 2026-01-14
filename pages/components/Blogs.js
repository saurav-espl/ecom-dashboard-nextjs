import { useEffect, useState } from 'react';
import Link from 'next/link';

// Updated function: No more .split()
const truncateText = (text, charLimit) => {
    // Safety check: if text is null, undefined, or not a string
    if (!text || typeof text !== 'string') return '';

    // If text is longer than our character limit, cut it and add dots
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + '...';
    }

    return text;
};

const Posts = ({ limit = 10 }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                setPosts(Array.isArray(data) ? data.slice(0, limit) : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [limit]);

    if (posts.length === 0) return <p>Loading...</p>;

    return (
        <section className='posts'>
            <div className='section_wrapper container'>
                <div className='SecTitle'>
                    <h2>All Blogs</h2>
                </div>
                <ul className='all_post'>
                    {posts.map((post, index) => (
                        <li className='postlists' key={post.slug || index}>
                            <Link href={`/blog/${post.slug}`}>
                                {post.heading || 'Untitled Post'}
                            </Link>
                            {/* We are now limiting by 150 characters instead of 60 words */}
                            <p>{truncateText(post.first_p, 150)}</p>
                            <Link href={`/blog/${post.slug}`}>
                                Read More
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Posts;