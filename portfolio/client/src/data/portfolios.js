
import {imageContentsCNU, imageContentsPort} from "./portfoliosImages";
import {detailContentsCNU, detailContentsPort} from "./portfoliosDetails";


const portfolios = [

    {
        id: 1,
        category: 'Python',
        image:imageContentsCNU,
        link1: 'https://github.com/Funbucket/CnuChatBot',
        title: 'Cnubot',
        text: 'Chungnam National University chatbot for convenience',
        team: `2人 팀 프로젝트`,
        detailContents:detailContentsCNU
    },
    {
        id:2,
        category:'FrontEnd',
        image:imageContentsPort,
        link1: 'https://github.com/ChanhyukPark-Tech/WebProgramming/tree/main/portfolio',
        title: 'Portfolio',
        text:'Personal website for self PR',
        team: `개인 프로젝트`,
        detailContents:detailContentsPort,
    }
]

export default portfolios;