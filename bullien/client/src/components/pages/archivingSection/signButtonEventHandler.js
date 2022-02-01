import ReactGA from "react-ga";
const link = `mailto:koreabullien@gmail.com
                                 ?cc=myCCaddress@example.com
                                 &subject=제목을 작성해주세요
                                 &body=내용을 작성해주세요`
export const kakaoClick = e => {
    e.stopPropagation();

    ReactGA.event({
        category: 'KaKao',
        action: 'Click the kakao banner'
    })
    window.open('https://pf.kakao.com/_txiVxms', '_blank')
}

export const neonKoreanVerClick = (e,history) => {
    e.stopPropagation();

    ReactGA.event({
        category: 'KoreanNeon',
        action: 'Click the KoreanNeon banner'
    })
    history.push('/')
}

export const neonEnglishVerClick = (e,history) => {
    e.stopPropagation();

    ReactGA.event({
        category: 'EnglishNeon',
        action: 'Click the EnglishNeon banner'
    })
    history.push('/about')
}

export const postBoxClick = e => {
    e.stopPropagation();

    ReactGA.event({
        category: 'PostBox',
        action: 'Click the PostBox banner'
    })
    window.location.href = link
}