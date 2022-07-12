# react-query practice

평소 Redux toolkit 을 사용해서 상태관리를 하였는데, 비동기 통신은 Thunk 를 사용해서 주로 진행하였다.
너무 편하다고만 생각했지만, 프로젝트가 비대해질수록 리덕스가 더이상 store 의 역할을 넘어서 비동기 통신을 하는데 목적을 두고 있다는 생각이 스쳤다.
또한 클라이언트 상태와 서버상태가 동기화가 되지 않는다는 문제가 발생하였고, 이는 다수의 사용자가 웹사이트를 동시에 이용하며 특정 서버 상태를 mutation 시킬때 데이터의 무결성이 유지되지 않는 현상이 발생하였다.

이러한 문제로 인해 클라이언트 상태와 서버상태를 명확하게 구분지어서 프로젝트를 관리해야겠다고 생각을 하였고, 과거부터 배우고 싶었던 react-query 를 통해 서버상태를 관리하고 데이터를 패칭하는 방법을 깊게 배워보는 시간을 가졌다.

[nextjs환경에서 react-query를 이용해 무한스크롤 구현](https://github.com/ChanhyukPark-Tech/WebProgramming/tree/main/react-query-tutorial/nextjs-react-query-infinity-scroll)
