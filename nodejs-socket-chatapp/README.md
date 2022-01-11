# node JS & socket.io 💬
### 실시간 채팅 웹 어플리케이션

- 바닐라 자바스크립트로 만들어 보는 채팅앱 
- socket.io 라이브러리를 사용하여 웹소켓 구현
- node js 로 웹서버 구현, express 프레임워크 얹기
- css styling, flex 박스

### 📖 배운점

- front 와 backend 사이의 socket 통신하는 방법
- 전송버튼을 마우스로 클릭하는하지 않고, 엔터버튼을 눌렀을때 채팅을 전송하는방법 (`keypress` 이벤트이용)
- classList 를 이용해서 receiver 와 sender 에 따른 채팅 보여주기 방법을 다르게 하는법
- `moment` 를 사용해 현재 시간을 형식에 맞춰서 보여주는 방법
- dom 을 오른쪽으로 붙힐때 `float:right` 를 주는 방법
- 항상 최신의 채팅을 보여주기 위해서 scroll 을 제어하는 방법 (`scrollTo`)
- 함수를 이용해 인스턴스화 하는방법

### 😵‍💫 Trouble shooting
이벤트 핸들러 안에 socket.on method 를 넣어둬서 이벤트가 발생하면 계속 소켓통신이 발생하는 현상이 발생했다.
예를들어 click event 안에 socket.on 을 넣어둬서 한번 클릭에도 몇번의 채팅이 보내지는 현상이 발생했다.
핸들러 밖으로 socket.on method 를 분리함으로써 해결하였다.
