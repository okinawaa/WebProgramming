import React, {useState} from 'react';
import Axios from "axios";
import {useSelector} from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("");


    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,  // 로컬스토리지도 가능
            postId: videoId
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    props.refreshFunction(response.data.result)
                    setcommentValue("");
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }

    return (

        <div>
            <br/>
            <p> Replies </p>
            <hr/>

            {/*comment Lists*/}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
                    <ReplyComment refreshFunction={props.refreshFunction} parentCommentId = {comment._id} commentLists = {props.commentLists} postId={props.postId}/>
                    </React.Fragment>
                )

                ))}

            <form style={{display: "flex"}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="write some comments"
                />
                <br/>
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>


        </div>
    );
}

export default Comment;