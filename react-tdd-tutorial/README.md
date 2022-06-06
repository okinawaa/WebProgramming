# TDD Flow in React.js 

<code><img width="30" height="30" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"></code>
<code><img width="30" height="30" src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg"></code>
<code><img width="30" height="30" src="https://user-images.githubusercontent.com/69495129/150062202-357f5dff-005a-4cf9-bd08-cbb8810f7932.png"></code>
<code><img width="30" height="30" src="https://user-images.githubusercontent.com/69495129/150062250-e3a7fcc5-d164-4476-ae61-6ba15d694358.png"></code>



### 동기

`테스트 주도 개발(TDD)` 를 사용하여 리액트 어플리케이션을 제작함으로써 개발 단계 및 유지보수 측면에서 안정성을 가짐 테스트 코드의 중요성은 알고 있었지만, 테스트 코드란 일반적으로 알고리즘에만 적용된다고 생각했다. 하지만 프론트엔드 개발을 하면서도 테스트 코드의 중요성이 확대되고, 나역시 많은 어플리케이션을 테스트 코드 없이 제작하면서 테스트 코드의 필요성을 느꼈기 때문에 꼭 배워서 실무에서 사용해보고 싶다고 생각했다.





### 배운점

- 리액트 테스트
- 리액트 Context
- Jest
- React Testing Library
- Mock Service Worker


#### TEST

알고리즘 문제의 테스트 코드와는 다르게, 프론트 개발에서의 테스트 코드를 작성하는 방법에 대해서 배웠다. 일반적인 테스트 문법같은것은 프로그래밍 사고가 있는 나에게는 편하게 다가왔지만, TDD 의 진정한 필요성 및 실제 도입할 경우의 Flow 등은 다소 어려웠던 것 같다. 예를들어 구현자체는 쉽지만, 어떠한 부분(기능) 을 테스트 해야할지에 대한 고민은 계속 필요할 것 같다. 


#### MSW 

MSW는 Mock Service Worker로 서비스 워커를 이용하여 API를 모킹하는 라이브러리입니다. 네트워크 요청을 가로채도록 설계된 Service Worker API를 활용하기 때문에 목 사용 여부 관계 없이 동일한 애플리케이션 동작을 보장합니다. 또한, 모킹을 위해 애플리케이션 코드를 변경할 필요가 없습니다. 백엔드와 협업하는 경우에 백엔드 API 가 일정보다 늦어지는 경우가 발생하고 그럴때마다 dummy data 를 만들어서 프론트 개발을 진행하는데 있어서 불편함을 느꼈는데, 이번에 MSW 를 배움으로써 꼭 이용해서 프론트 개발을 하고 싶다고 생각을 했다.


### 강연 내용 추가

프론트엔드에서 TDD가 가능하다는 것을 보여드립니다.

브라우저에서 오직 눈으로만 결과물을 확인하고 계신가요? 그것만으론 불안해서 테스트 코드를 작성해보려 했지만 어려움을 겪어 보셨다면 주목해주세요. React에서 테스트 가능한 코드 작성법을 알아보고 프론트엔드 개발에 TDD를 적용하는 방법을 소개합니다. using live coding


### 블로그 정리
[쿼리함수에 대하여](https://chanhyukpark-tech.github.io/reactjs/react-test-what-is-the-query-function-copy/)
[userEvent 대신 fireEvent ! ](https://chanhyukpark-tech.github.io/reactjs/react-test-userEvent-fireEvent/)
