import { useEffect, useState } from 'react';
import Link from 'next/link';

// CLEANER TRUNCATE: Removed .split() and used .substring()
const truncateText = (text, charLimit) => {
    if (!text || typeof text !== 'string') return '';

    // Works with characters instead of an array of words
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + '...';
    }
    return text;
};

const Service = ({ limit = 10 }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setPosts(data.slice(0, limit));
                }
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
                    <h2>All Services</h2>
                </div>
                <ul className='all_post'>
                    {posts.map((post, index) => (
                        <li className='postlists' key={post.slug || index}>
                            <Link href={`/service/${post.slug}`}>
                                {post.heading || "Untitled Service"}
                            </Link>

                            {/* Increased limit to 150 because we are now counting characters, not words */}
                            <p>{truncateText(post.first_p, 150)}</p>

                            <Link href={`/service/${post.slug}`}>
                                Read More
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Service;