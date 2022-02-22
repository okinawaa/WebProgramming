# Docker AtoZ <code><img width="50" height="50" src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg"></code><code><img width="50" height="50" src="https://user-images.githubusercontent.com/69495129/154376975-37aa19cc-cbe0-439c-ab4f-effa57ba3cab.png"></code>
인프런 [JohnAhn](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci) 님의 강의를 참고하였습니다.
---
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

---

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
- 컨테이너들 나열하기
  - 현재 실행중인 컨테이너 나열 docker ps
  - 모든 컨테이너 나열  docker ps -a
- 도커 컨테이너의 생명주기
  -  생성 시작 실행 중지 삭제 
  -  create 와 start 를 합친게 run 
-  docker stop vs docker kill
  -  stop 이 더 graceful 하게 죽인다.
  -  kill 은 말그대로 그냥 죽인다. (forced)
- 도커 컨테이너 삭제하기
  - 중지된 컨테이너를 삭제하고 싶다면? docker rm <아이디/이름>
  - 모든 컨테이너를 삭제하고 싶다면? docker rm `docker ps -a -q`
  - 이미지를 삭제하고 싶다면? docker rmi <이미지 id>
  - 한번에 사용하지 않는 컨테이너, 이미지, 네트워크 모두 삭제하고 싶다면? docker system prune
- 실행 중인 컨테이너에 명령어 전달
  - docker exec <컨테이너 아이디>
  - docker run 은 `새로 컨테이너`를 만들어서 실행
  - docker exec 은 이미 `실행 중인 컨테이너`에 명령어를 전달


#### 도커를 이용한 간단한 Node.js 어플 만들기

#### Docker Compose

#### 간단한 어플을 실제로 배포해보기(개발 환경 부분)

#### 간단한 어플을 실제로 배포해보기(테스트 & 배포 부분)

#### 복잡한 어플을 실제로 배포해보기(개발 환경 부분)

#### [복잡한 어플을 실제로 배포해보기(테스트 & 배포 부분)](https://github.com/ChanhyukPark-Tech/WebProgramming/tree/main/docker-atoz/docker-full-stack-app-master)
