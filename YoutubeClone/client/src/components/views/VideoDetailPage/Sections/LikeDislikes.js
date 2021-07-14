import React, {useEffect, useState} from 'react';
import {Tooltip, Icon} from "antd";
import Axios from "axios";


function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikesAction, setDislikesAction] = useState(null)

        let variable = {}
        if (props.video) {
            variable = {videoId: props.videoId, userId: props.userId}
        } else {
            variable = {
                commentId: props.commentId, userId: props.userId
            }
        }
    useEffect(() => {


        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {

                    // 얼마나 많은 좋아요를 받았느지
                    setLikes(response.data.likes.length);

                    // 내가 이미 그 좋아ㅇ를 눌렀는지

                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Likes의 정보를 가져오지 못했습니다.')
                }
            })
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {

                    // 얼마나 많은 싫어요를 받았느지
                    setDislikes(response.data.dislikes.length);

                    // 내가 이미 그 싫어요를 눌렀는지

                    response.data.dislikes.map(dislikes => {
                        if (dislikes.userId === props.userId) {
                            setDislikesAction('disliked')
                        }
                    })
                } else {
                    alert('disLikes의 정보를 가져오지 못했습니다.')
                }
            })

    }, [])


    const onLike = () => {
        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked');

                        if(DislikesAction !== null){
                            setDislikesAction(null);
                            setDislikes(Dislikes - 1 );
                        }

                    } else {

                        alert('Like를 올리지 못하였습니다'
                        )
                    }
                })
        }else{  // like 이 클릭이 되어있었을때


            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1);
                        setLikeAction(null);

                    } else {

                        alert('Like를 내리지지 못하였습니다'
                       )
                    }
                })
        }
    }

    const onDislike = ()=>{
        if(DislikesAction !== null){

            Axios.post('/api/like/unDislike',variable)
                .then(response=>{
                    if(response.data.success){
                        setDislikes(Dislikes - 1);
                        setDislikesAction(null);
                    }else{
                        alert('dislike을 지우지 못했습니다.'
                        )
                    }
                })
        }else{

            Axios.post('/api/like/upDislike',variable)
                .then(response=>{
                    if(response.data.success){
                        setDislikes(Dislikes + 1);
                        setDislikesAction('disliked')

                        if(LikeAction !== null){
                            setLikeAction(null);
                            setLikes(Likes - 1);
                        }

                    }else{

                    }
                })



        }
    }


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                          onClick={onLike}
                    >

                    </Icon>

                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>
            &nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                          theme={DislikesAction === 'disliked' ? 'filled' : 'outlined'}
                          onClick={onDislike}
                    >
                    </Icon>
<span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
                </Tooltip>

            </span>
            &nbsp;&nbsp;
        </div>
    );
}

export default LikeDislikes;