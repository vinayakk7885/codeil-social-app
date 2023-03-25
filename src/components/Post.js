import PropTypes from 'prop-types';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';
import { createComment, toggleLike } from '../api';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ( {post} )=>{
    const [comment, setComment]=useState('');
    const [creatingComment, setCreatingComment] = useState(false);
    const posts = usePosts();
    const {addToast}=useToasts();

    const handleAddComment = async (e) =>{
        if(e.key === 'Enter'){
            setCreatingComment(true);
            const response= await createComment(comment,post._id);
            if(response.success){
                setComment('');
                console.log('posts : ',posts)
                posts.addComment(response.data.comment, post._id);
                addToast('Comment created successfully', {
                    appearance:'success',
                })
            }
            else{
                addToast(response.message, {
                    appearance: 'error',
                })
            }
            setCreatingComment(false);
        }
    };
    const handlePostLikeClick = async () =>{
        const response=await toggleLike(post._id, 'Post');
        if(response.success){
            if(response.data.deleted){
                addToast('Like Removed Successfully', {
                    appearance:'success',
                })
            }
            else{
                addToast('Like Added Successfully', {
                    appearance: 'error',
                })
            }
        }
        else{
            addToast(response.message, {
                appearance: 'error',
            })
        }
    };
    return(
        <div className={styles.postWrapper} key={`post-${post._id}`}>
                    <div className={styles.postHeader}>
                        <div className={styles.postAvatar}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                                alt="user-pic" 
                            />
                            <div>
                                <Link to={{
                                    pathname:`/user/${post.user._id}`,
                                    state:{
                                        user: post.user,
                                    }
                                }}
                                className={styles.postAuthor}>{post.user.name}</Link>
                                <span className={styles.postTime}>a minute ago</span>
                            </div>    
                        </div>
                        <div className={styles.postContent}>{post.content}</div>
                        <div className={styles.postActions}>
                            <div className={styles.postLike}>
                                <button onClick={handlePostLikeClick} >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                                        alt="likes-icon"
                                    />
                                </button>
                                <span>{post.likes.length}</span>
                            </div>
                            <div className={styles.postCommentsIcon}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/13/13673.png"
                                    alt="comments-icon"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                        </div>

                        <div className={styles.postCommentBox}>
                            <input 
                                placeholder="Start typing a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value) }
                                onKeyDown={ handleAddComment }
                            /> 
                        </div>
                        <div className={styles.postCommentsList}>
                            { post.comments.map( (comment)=>{
                                return <Comment comment={comment}/>
                            })}
                        </div>    
                    </div>
                </div>
    )
}
Post.prototypes={
    posts : PropTypes.array.isRequired,
}
export default Post