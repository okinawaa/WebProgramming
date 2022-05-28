# Docker-compose

빅픽처팀 사내스터디 주제입니다.


# Docker-compose 란

```
보통은 여러 애플리케이션이 서로 의존성 있게 구성되어 시스템이 이뤄져 있다.
그래서 하나의 컨테이너가 하나의 애플리케이션을 담당하기 때문에 여러 개의 컨테이너가 필요하다.
도커 컴포즈(Docker Compose)는 yaml 포맷으로 작성되고, 
여러 컨테이너들을 한 번에 관리를 할 수있게 도와주는 역할을 한다.
```

- 클라이언트와 Nginx 를 같이 띄우는 경우가 많다,
- 서버와 데이터베이스를 같이 띄우는 경우도 많다.

# **docker-compose.yml**

```
docker-compose.yml은 장황한 도커 실행 옵션을(일련의 실행 과정) 미리 적어둔 문서이다. 
프로젝트 루트에 파일을 만들고(루트가 아니여도 경로를 설정해줄 수 있다), 실행 설정을 적어준다.
그래야 터미널에서 도커 명령어를 사용하여 컨테이너를 실행하거나 죽일 수 있다.
```

![image](https://user-images.githubusercontent.com/69495129/170601809-90e59735-7013-4ae4-b7e3-eabc5afdb142.png)

- `version: '3'` 버전에 따라 지원하는 도커 엔진 버전도 다르다.
- service: 실행할 컨테이너 정의. `docker run --name django`와 같다고 할수있다.

```
service:
 diango:
  ...
```

- image: 컨테이너에 사용할 이미지 이름과 태그. 태그를 생략하면 자동으로 latest. 이미지가 없으면 자동으로 pull

```
  service:
   django:
    image: django-sample
```

- ports: 컨테이너와 연결할 포트(들). (호스트포트):(컨테이너 포트)

```
  services:
   django:
   ...
   ports:
   - "8000:8000"
```

- environment: 컨테이너에서 사용할 환경변수(들). {환경변수이름}:{값}

```
  services:
   mysql:
   ...
   environment:
    - MYSQL_ROOT_PASSWORD=somewordpress: '3'
```

- volumes: 마운트하려는 디렉터리(들). {호스트 디렉터리}:{컨테이너 디렉터리}

```
  services:
   django:
   ...
   volumes:
   - ./app:/app
```

- restart: 재시작 정책. 종류: "no", always, on-failure, unless-stopped

```
  services:
   django:
    restart: always
```

- build: 이미지를 자체 빌드 후 사용. image 속성 대신 사용. 여기에 사용할 별도의 도커 파일이 필요함

```
  django:
   build:
    context: .
    dockerfile: ./compose/django/Dockerfile-dev
```

- command : 도커 실행 후 도커내에 실행할 명령어

```
  version: '2'

  services:
    app:
      image: php:7
      volumes:
        - ./hello.php:/app/hello.php
      command: "php /app/hello.php"
```

# **docker-compose 기본명령어**

- docker-compose up [옵션] [서비스명]

![image](https://user-images.githubusercontent.com/69495129/170601829-d1ef2c49-3f9d-4fd4-8750-ca9e69d1be46.png)

1. up: docker-compose.yml에 정의된 컨테이너를 실행
    - `docker-compose up`
    - `docker-compose up -d`: `docker run`의 `d`옵션과 동일
    - `docker-compose up --force-recreate`: 컨테이너를 새로 만들기
    - `docker-compose up --build` : 도커 이미지를 다시 빌드(build로 선언시에만)
2. start: 멈춘 컨테이너를 재개
    - `docker-compose start`
    - `docker-compose start wordpress`: wordpress 컨테이너만 재개
3. restart: 컨테이너를 재시작
    - `docker-compose restart`
    - `docker-compose restart wordpress`: wordpress 컨테이너만 재시작
4. stop: 컨테이너를 멈춤
    - `docker-compose stop`
    - `docker-compose stop wordpress`: wordpress 컨테이너만 멈춤
5. down: 컨테이너를 종료하고 삭제
    - `docker-compose down`
6. logs: 컨테이너의 로그
    - `docker-compose logs`
    - `docker-compose logs -f`: 로그 follow
7. ps: 컨테이너 목록
    - `docker-compose ps`
8. exec: 실행 중인 컨테이너에서 명령어 실행
    - `docker-compose exec {컨테이너 이름} {명령어}`
    - `docker-compose exec wordpress bash`
9. build: 컨테이너 build 부분에 정의된 내용대로 빌드
    - build로 선언된 컨테이너만 빌드됨
    - `docker-compose build`
    - `docker-compose build wordpress`: wordpress 컨테이너만 build

# 예시

- Mariadb과 WordPress를 도커 컴포즈로 만들어보자.

```docker
//docker-compose.yml
version: '2'
services:
  db:
    image: mariadb:10.5
    volumes:
      - ./mysql:/var/lib/mysql
    restart: always #도커가 죽이면 자동으로 재실행
  	environment:
    	MYSQL_ROOT_PASSWORD: wordpress
      	MYSQL_DATABASE: wordpress
      	MYSQL_USER: wordpress
      	MYSQL_PASSWORD: wordpress
      
  wordpress:
    image: wordpress:latest
    volumes:
      - ./wp:/var/www/html
    ports:
      - "8000:80"
    restart: always
    environment:
    	WORDPRESS_DB_HOST: db:3306
        WORDPRESS_DB_USER: wordpress
        WORDPRESS_DB_PASSWORD: wordpress
```

- 실행 `docker-compose up`
- 중지 `docker-compose down`

# REF
https://www.notion.so/minsooweb/cc43a447a9d843609f5f0794eec5fce9#ddd282232d834b69a0661fbce6f5aa30
https://www.notion.so/minsooweb/cc43a447a9d843609f5f0794eec5fce9#41151ca49f33443584b7567bf3822c1b
