import { useLayoutEffect } from "react";

const useObserver = ({
  target, // 감지할 대상, ref를 넘길 예정
  onIntersect, // 감지 시 실행할 callback 함수
  threshold = 1.0 // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
}: {
  target: React.RefObject<HTMLDivElement | HTMLAnchorElement>;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
}) => {
  useLayoutEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: "0px",
        threshold
      });
      // 실제 Element가 들어있는 current 관측을 시작한다.
      observer.observe(target.current);
    }

    // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자.
    return () => observer && observer.disconnect();
  }, [onIntersect, target, threshold]);
};

export default useObserver;
