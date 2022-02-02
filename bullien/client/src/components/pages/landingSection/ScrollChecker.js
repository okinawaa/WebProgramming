import {useEffect, useState} from "react";


function ScrollChecker(props) {
    const [ScrollY, setScrollY] = useState(0);  // 스크롤값을 저장하기 위한 상태
    const handleFollow = () => {
        setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
    }
    const setScrollOver = props.setScrollOver
    useEffect(() => {
        if (ScrollY > 0 && ScrollY >= (document.querySelector('body').offsetHeight - 40 - window.innerHeight)) {
setScrollOver(true);
        }
        if (ScrollY > 0 && ScrollY < (document.querySelector('body').offsetHeight - 40 - window.innerHeight)) {
            setScrollOver(false);
        }
    }, [ScrollY,setScrollOver])


    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow);
        }
        watch(); // addEventListener 함수를 실행
        return () => {
            window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
        }
    },[])

    return null
}

export default ScrollChecker;