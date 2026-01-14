import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faEye } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/posts/${id}`);
                const data = await response.json();
                setPostData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!postData) return <p>Loading.....</p>;

    return (
        <section className='Post_list'>
            <div className='section_wrapper container'>
                <h1>{postData.title}</h1>
                <p>{postData.body}</p>
                <div className="tags">
                    <h3>Tags</h3>
                    <div className='tagList'>
                        {postData.tags?.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        )) || <p>No tags available</p>}
                    </div>
                </div>

                <div className='likes'>
                    <h3>Likes</h3>
                    <div className='likeslist'>
                        <p>
                            {/* FIX: Added safety guard */}
                            {faThumbsUp && <FontAwesomeIcon icon={faThumbsUp} />}
                            <span> {postData.reactions?.likes ?? postData.reactions ?? 0}</span>
                        </p>
                        <p>
                            {/* FIX: Added safety guard */}
                            {faThumbsDown && <FontAwesomeIcon icon={faThumbsDown} />}
                            <span> {postData.reactions?.dislikes ?? 0}</span>
                        </p>
                    </div>
                </div>
                <div className='views'>
                    <h3>Views</h3>
                    <div className='viewlist'>
                        <p>
                            {/* FIX: Added safety guard */}
                            {faEye && <FontAwesomeIcon icon={faEye} />}
                            <span> {postData.views}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;