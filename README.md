## 2019.03.10 ~ 2019.04.07 개인 블로그 (Spring+React)

> 개발하면서 공부한 것을 기록하고 공유하기 위해서 만든 개인블로그 입니다.

> Spring과 react를 결합해서 만들었습니다.

> [사이트방문하기](http://developerblog.shop/)

---
### 개발환경
 * frontend 관련
   * react,node,npm
 * backend 관련
   * spring,mysql,mybatis,tomcat
 * 운영체제
   * windows

---
### 배포환경
 * 클라우드 컴퓨팅
   * 토스트클라우드
 * 서버
   * node에 proxy 설정을 통해 tomcat과 통신
 * DB
   * mysql 5.6

---
### 주요기능
* 게시판 CRUD
* 로그인 세션,비밀번호 암호화
* 댓글 CRUD,페이징
* 검색,페이징
* 파일업로드 및 데이터 uri 스킴 방식의 이미지 업로드
* 토스트 uri editor 적용으로 마크다운 방식의 글 작성 기능
* 최신글 기능
* 주제에 포함된 다른글 슬라이더 (현재글 포함 및 강조ui 추가)
* 리액트 시계와 방문자수 스케쥴러 적용
* 반응형 ui 적용
* 다음글,이전글 기능
---
### 배포과정

* 토스트클라우드에 인스턴스 생성
* mysql,tomcat,node,npm 설치
* war파일,리액트 파일 FTP로 전송
* package.json install 후 eject 와 build 진행
* 도메인 A레코드로 연결 

---
### 문제해결

* 처음에 npm과 node 버전을 낮은 버전으로 진행하였는데 npm install이 너무 느리고 완료되지 못했음
  * npm과 node 업그레이드 후 문제 해결
* npm eject의 경우 복사본 문제가 발생하였음
  * npm i -f 로 강제 eject 진행하여 해결하였음
* npm build의 경우 너무 낮은 메모리의 인스턴스를 빌려서 사용하다보니 node의 메모리 증식문제 때문에 완료하지 못하고 에러가 발생함
  * sudo npm run build -g increase-memory-limit 로 메모리를 제한하여 해결하였음
* ip로 외부접속은 되었으나 도메인으로는 invalid host header가 발생하며 접속이 되지 않는 문제
  * webpackDevServer.config.js에 public을 도메인주소로 변경하여 문제 해결
* /static/js 404 에러가 계속해서 발생했음
  * webpack.config.js 의 ('webpack-dev-server/client')에 + '?http://0.0.0.0:3000', 를 추가 함으로 해결
* 메모리 부족으로 인한 서버 접속 불가 문제
  * 배포 후 정상적으로 몇달간 유지하던 중 구글에 노출되고 블로그에 접속자가 생기자 톰캣이 다운되는 문제가 발생
  * 인스턴스가 가장 낮은단계라 auto scale 기능이 제공되지 않아서 한단계 높은 사양의 인스턴스를 새로 생성
  * 새로운 인스턴스에 필요한 모듈과 백업해놓은 dump파일을 다운받아 설치하고 도메인 dns 수정하여 해결 
* npm에서 새로운 모듈을 install 하던 중 no such lodash.js 등 여러 모듈들을 찾을 수 없다는 에러 메세지 발생
  * node.js를 중지시켰으나 작동하지 않아 서버를 재부팅 -> npm cache clean -> node_modules,package-lock.json 삭제 -> npm install 진행
  * 하지만 계속해서 error가 발생하였고 package.json 백업본으로 교체 후 npm install -f 로 해결
* mysql + tomcat의 경우 8시간 이상 접속이 없을 시 커넥션이 끊기는 현상이 있음
  * 새로고침 한번이면 해결되지만 최초접속자는 DB정보를 제대로 가져오지 못함
  * DBCP Datasource 설정을 통해 문제 해결
* 최신글 NullpointerException 문제
  * 리소스 폴더의 권한 문제였고 chown으로 톰캣유저에게 권한을 줌으로 써 해결

---
### 추가된 DBCP 설정

정의한 값

1. initialSize : 풀의 초기 커넥션 갯수

2. maxActive : 최대 커넥션 갯수
3. maxWait : 커넥션이 존재하지 않을 때, 커넥션을 얻기까지 대기하는 최대 대기시간
4. maxIdle : Idle상태에 풀이 소유한 최대 커넥션 갯수
5. testOnBorrow : 풀에서 커넥션을 가져올시 커넥션의 유효성 검사
6. testOnReturn : 풀에 커넥션을 리턴할 때 커넥션의 유효성 검사
7. validationQuery : validate Query
8. testWhileIdle : Idle상태에 커넥션의 유효성 검사
9. timeBetweenEvictionRunsMillis : 설정된 주기를 통해 Evict(유효하지 않는 커넥션/정의된 시간이 만료된 커넥션을 풀에서 제거) 쓰레드를 수행
10. minEvictableIdleTimeMiilis : Evict 쓰레드를 수행시, 만료여부를 체크할 시간을 정의
11. numTestsPerEvictionRun : Evict 쓰레드를 수행시 수행할 커넥션의 갯수
12. removeAbandonedTimeout : 유효하지 않은 커넥션의 삭제시의 타임아웃
13. removeAbandoned : 유효하지 않는 커넥션의 제거 여부
14. logAbandoned : 유효하지 않는 커넥션을 생성한 코드 위치 로그생성 여부

정의하지 않은 값
1. defaultAutoCommit : 생성된 커넥션의 기본 auto commit 여부
2. defaultReadOnly : 생성된 커넥션의 기본 read-only 여부
3. defaultTransactionIsolation : 생성된 커넥션의 기본 트랜잭션 격리 수준
4. defaultCatalog : 생성된 커넥션의 기본 카탈로그
5. connectionInitSqls : ?
6. poolPreparedStatements : Prepared Statements 사용 여부
7. maxOpenPreparedStatements : Prepared Statements 최대 Open 갯수
8. accessToUnderlyingConnectionAllowed : ?
9. minIdle : Idle상태에 풀이 소유한 최소 커넥션 갯수

---
