import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                const post = data.find(item => item.slug === slug);
                setPostData(post);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug]);

    if (!postData) return <p>Error 404 Not Found</p>;

    return (
        <section className='Post_list'>
            <div className='section_wrapper container'>
                <h1>{postData.heading}</h1>
                <p>{postData.body}</p>
                <p>{postData.first_p}</p>
                <p>{postData.second_p}</p>
            </div>
        </section>
    );
};

export default Page;
