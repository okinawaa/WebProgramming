import cnubot from '../img/portImages/cnubot/cnubot.jpg'
import cnubot2 from '../img/portImages/cnubot/cnubot2.jpg'
import cnubot3 from '../img/portImages/cnubot/cnubot3.jpg'
import cnubot4 from '../img/portImages/cnubot/cnubot4.jpg'
import cnubot5 from '../img/portImages/cnubot/cnubot5.jpg'
import cnubot6 from '../img/portImages/cnubot/cnubot6.jpg'

const detailContentsCNU = [

    {
        id: 1,
        Title: `제작동기 : `,
        Content: `학교의 다양한 정보가 분산되어있기 때문에, 여러가지 정보를 원하는 학생들의 입장에서는 불편함을 느낀다고 생각하고 이를 해결하기위해 한 곳에서 학교의 많은 정보를 종합하여 얻을 수 있는 플랫폼이 필요하다고 생각하여 챗봇 제작`
    },
    {
        id: 2,
        Title: `주요기능 : `,
        Content: `👉학식 : [기숙사식당 , 제1학생회관, 제2학생회관, 제3학생회관] 식단 및 운영 시간
            👉셔틀 : [A노선 , B노선 , C노선] 정류장별 버스 잔여시간 및 노선표
                👉열람실 : 도서관 층별지도보기 및 열람실 총 좌석 , 잔여좌석 운영여부   
            👉알뜰정보 : 최신 학사정보, 최신 문화정보 , 각종 충남대학교 전화번호`,
    },
    {
        id:3,
        Title:`자기성찰 : `,
        Content: `친구와 프로그래밍을 같이 시작하고 같이 한 처음 프로젝트였기 때문에, 둘다 처음에는 맨땅에 헤딩하는 심정으로 프로젝트를 시작하였습니다. 2020년 겨울방학 2개월동안 짧게 개발을 배운후, 사람들에게 편의성을 제공해주고자 서비스를 구축하고자하였습니다. 처음보는 Aws, Django, API 와 같은 개념들이 어렵게 다가왔지만, 하나씩 문제를 구글링해가며 해결해가는 과정속에 성장함을 느꼈습니다. 내 손으로 구축한 서비스를 몇명이라도 알아주고 이용해준다면 그게 얼마나 감격스러운 일인지 처음 알게 된 프로젝트 였습니다.     `
    },
    {
        id:4,
        Title:`사용기술 : `,
        Content: `Aws, Apache, Django, beautifulSoup, 카카오톡 오픈빌더`
    }

]
const imageContentsCNU = [
    {
        image:cnubot
    },
    {
        image:cnubot2
    },
    {
        image:cnubot3
    },
    {
        image:cnubot4
    },
    {
        image:cnubot5
    },
    {
        image:cnubot6
    },
]
const portfolios = [

    {
        id: 1,
        category: 'Python',
        image:imageContentsCNU,
        link1: 'https://github.com/Funbucket/CnuChatBot',
        link2: 'https://www.google.com',
        title: 'Cnubot',
        text: 'Chungnam National University chatbot for convenience',
        team: `2人 팀 프로젝트`,
        detailContents:detailContentsCNU
    },

]

export default portfolios;