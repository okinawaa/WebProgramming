import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd'
import Axios from "axios";

function VideoDetailPage(props) {


    const videoId = props.match.params.videoId;
    const variable = {
        videoId : videoId
    }
    const [VideoDetail,setVideoDetail] = useState([]);


    useEffect(()=>{
        Axios.post('/api/video/getVideoDetail',variable)
            .then(response=>{
                console.log("실행")
                if(response.data.success){
                    console.log(response.data.videoDetail);
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert('비디오 정보를 불러오는데 실패하였습니다.')
                }
            });
    },[])
    if(VideoDetail.writer){
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>

                    <div stlye={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`}/>
                        <List.Item>

                            <List.Item.Meta
                                avatar={ <Avatar src={VideoDetail.writer.image}/>  }
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />

                        </List.Item>
                    </div>
                </Col>
                <Col lg={6} xs={24}></Col>
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