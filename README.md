## 2019.03.10 ~ 2019.04.07 개인 블로그 (Spring+React)

> 개발하면서 공부한 것을 기록하고 공유하기 위해서 만든 개인블로그 입니다.

> Spring과 react를 결합해서 만들었습니다.

> [데모사이트](http://developerblog.shop/)

### 주요기능
* 게시판 CRUD
* 로그인 세션,비밀번호 암호화
* 댓글 CRUD,페이징
* 검색,페이징
* 파일업로드 및 데이터 uri 스킴 방식의 이미지 업로드
* 토스트 uri editor 적용으로 마크다운 방식의 글 작성 기능
* 최신글 기능
* 주제에 포함된 다른글 슬라이더
* 리액트 시계와 방문자수 스케쥴러 적용

### 배포과정

* 토스트클라우드에 인스턴스 생성
* mysql,tomcat,node,npm 설치
* war파일,리액트 파일 FTP로 전송
* package.json install 후 eject 와 build 진행
* 도메인 A레코드로 연결 

### 문제해결

* 처음에 npm과 node 버전을 낮은 버전으로 진행하였는데 npm install이 너무 느리고 완료되지 못했음
  * npm과 node 업그레이드 후 문제 해결
* npm eject의 경우 복사본 문제가 발생하였음
  * npm i -f 로 강제 eject 진행하여 강제로 진행하여 해결하였음
* npm build의 경우 너무 낮은 메모리의 인스턴스를 빌려서 사용하다보니 node의 메모리 증식문제 때문에 완료하지 못하고 에러가 발생함
  * sudo npm run build -g increase-memory-limit 로 메모리를 제한하여 해결하였음
* ip로 외부접속은 되었으나 도메인으로는 invalid host header가 발생하며 접속이 되지 않는 문제
  * webpackDevServer.config.js에 public을 도메인주소로 변경하여 문제 해결
* /static/js 404 에러가 계속해서 발생했음
  * webpack.config.js 의 ('webpack-dev-server/client')에 + '?http://0.0.0.0:3000', 를 추가 함으로 해결
