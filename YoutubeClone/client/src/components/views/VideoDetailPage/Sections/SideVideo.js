import React, {useEffect, useState} from 'react';
import Axios from "axios";

function SideVideo(props) {

    const [sideVideos,setsideVideos] = useState([]);

    useEffect(()=>{
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setsideVideos(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패 했습니다.')
                }
            })
    },[])

    const renderSideVideo = sideVideos.map((video,index)=>{
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);

        return  <div key={index} style={{display:"flex",marginBottom:'1rem',padding:'0 2rem'}}>
            <div style={{width:'40%',marginRight:'1rem'}}>
                <a href="">
                    <img src={`http://localhost:5000/${video.thumbnail}`} alt={video.thumbnail} style={{width:'100%',height:'100%'}}/>
                </a>
            </div>

            <div style={{width:'50%'}}>
                <a style={{color:"grey"}}>
                    <span style={{fontSize:'1rem',color:'black'}}>{video.title}</span><br/>
                    <span>{video.writer.name}</span><br/>
                    <span>{video.views} views</span><br/>
                    <span>{minutes} : {seconds}</span>
                </a>
            </div>
        </div>
    })

    return (

      <React.Fragment>

          {renderSideVideo}
      </React.Fragment>

    );
}

export default SideVideo;