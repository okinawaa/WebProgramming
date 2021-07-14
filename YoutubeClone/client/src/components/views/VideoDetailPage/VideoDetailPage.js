import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd'
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from './Sections/LikeDislikes'


function VideoDetailPage(props) {


    const videoId = props.match.params.videoId;
    const variable = {
        videoId : videoId
    }
    const [VideoDetail,setVideoDetail] = useState([]);
    const [Comments,setComments] = useState([]);


    useEffect(()=>{
        Axios.post('/api/video/getVideoDetail',variable)
            .then(response=>{
                if(response.data.success){
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert('비디오 정보를 불러오는데 실패하였습니다.')
                }
            });

        Axios.post('/api/comment/getComments',variable)
            .then(response=>{
                if(response.data.success){
                    setComments(response.data.comments)
                    console.log(response.data);
                }else{
                    alert('코멘트 정보를 불러오는데 실패하였습니다.')
                }
            });

    },[])

    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment));
    }
    if(VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id}/>
        return (
            <Row gutter={[16, 16]}>
                <div style={{margin:'3rem 4rem'}}>
                <Col lg={18} xs={24}>
                    <div stlye={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`}/>
                        <List.Item
                        actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId}/>,subscribeButton]}>
                            <List.Item.Meta
                                avatar={ <Avatar src={VideoDetail.writer.image}/>  }
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
                </div>
            </Row>
        );
    }
    else{
        return (
            <div>loading....</div>
        )
    }

}

export default VideoDetailPage;