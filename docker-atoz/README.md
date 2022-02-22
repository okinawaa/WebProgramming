# Docker AtoZ <code><img width="50" height="50" src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg"></code><code><img width="50" height="50" src="https://user-images.githubusercontent.com/69495129/154376975-37aa19cc-cbe0-439c-ab4f-effa57ba3cab.png"></code>
인프런 [JohnAhn](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci) 님의 강의를 참고하였습니다.

### Stack⚡

- Docker
  - `Docker Image` `Docker Container` `Docker Volume` `Docker Compose` `Docker Hub`
- AWS
  -  `IAM` `EC2` `ElasticBeanstalk` `VPC` `Security Group` `S3` `Dockerrunaws` `Task Definition`
- Travis CI
  -  `Travis Flow` `Travis.yml File` `Testing System` `Deployment System` `Enviroment Variables`
- etc
  -  `Node.js` `React.js` `Mysql` `Redis`



### Summary

Docker 를 이용한 Workflow

#### 도커기본

- 도커를 쓰는 이유 
  - 환경 구성, 버전관리
- 컨테이너 개념
- 이미지와 컨테이너 
  - 이미지 : 프로그램을 실행하는데 필요한 설정이나 종속성
  - 컨테이너 : 이미지의 인스턴스이며, 프로그램을 실행
- Docker 를 사용할때의 흐름 감잡기
  - Docker Client, Docker Server, Docker Hub
- Docker 와 기존의 가상화 기술과의 차이를 통한 컨테이너 이해
- 이미지로 컨테이너 만들기
- Cgroup, 네임스페이스를 쓸수 있는 이유 
  - based on linux 사실 리눅스 커널이 있다.

#### 기본적인 도커 클라이언트 명령어 알아보기

- 이미지 내부 파일 시스템 구조 보기
  -  docker run [이미지 이름] ls
