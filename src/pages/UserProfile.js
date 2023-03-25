import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { addFriend,removeFriend, fetchUserProfile } from '../api';
import { Loader } from '../components';

const UserProfile=()=>{
    const [user,setUser] =useState({});
    const [loading,setLoading]=useState(true);
    const [requestInProgress,setRequestInProgress]=useState(false);
    const {userId}=useParams();
    const {addToast}=useToasts();
    const history= useNavigate();
    const auth = useAuth();
    console.log("auth : ",auth)
    useEffect(()=>{
        const getUser = async () => {
            const response=await fetchUserProfile(userId);
            console.log("auth : ", auth )
            if(response.success){
                setUser(response.data.user);
            }
            else{
                addToast(response.message,{
                    appearance:'error',
                });
                return history('/');
            }
            setLoading(false);
        };
        getUser();
    }, [userId, history, addToast,auth]);
    
    if(loading){
        return <Loader/>;
    }
    const checkUserIsAFriend=()=>{
        const friends = auth.user.friends;
        const friendIds = friends.map(friend => friend.to_user._id);
        const index=friendIds.indexOf(userId);
        // console.log("index : ",index);

        if(index !== -1){
            return true;
        }
        return false;
    };
    const handleRemoveFriendClick= async ()=>{
        setRequestInProgress(true);
        const response = await removeFriend(userId);
        if(response.success){
            const friendship =auth.user.friends.filter(
                (friend) => friend.to_user._id === userId
            );
            auth.updateUserFriends(false,friendship[0]);
            addToast('Friend removed successfully',{
                appearance:'success',
            });
        }
        else{
            addToast(response.message,{
                appearance:'error',
            });
        }
        setRequestInProgress(false);

    }
    const handleAddFriendClick=async()=>{
        setRequestInProgress(true);
        const response=await addFriend(userId);
        if(response.success){
            const { friendship }=response.data;
            auth.updateUserFriends(true,friendship);
            addToast('friend added successfully',{
                appearance:'success',
            })
        }
        else{
            addToast(response.message,{
                appearance:'error',
            })
        }
        setRequestInProgress(false);

    }
    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/839/839374.png"
                    alt="" 
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{user.name}</div>
            </div>

            <div className={styles.btnGrp}>
                {checkUserIsAFriend() ? (
                    <button 
                        className={`button ${styles.saveBtn}`}
                        onClick={handleRemoveFriendClick}
                        disabled={requestInProgress}
                    >
                        {requestInProgress ? 'Removing Friend...' :'Remove Friend'}
                    </button>
                    ):(
                    <button 
                        className={`button ${styles.saveBtn}`}
                        onClick={handleAddFriendClick}
                        disabled={requestInProgress}
                    >
                        {requestInProgress ? 'Adding Friend...' :'Add Friend'}
                    </button>
                    )
                }
            </div>

        </div>
    );
}
export default UserProfile;