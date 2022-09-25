# week4-1 과제

## 7팀 소개

| [팀장 김유영](https://github.com/ezn6) | [구자덕](https://github.com/ted-jv) | [박정훈](https://github.com/Malza0408) | [송창석](https://github.com/SongChangseok) | [이지영](https://github.com/jiyounggo) | [최수진](https://github.com/ssujinc) |
| -------------------------------------- | ----------------------------------- | -------------------------------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------ |

<br>

## 과제 소개

- 투자 관리 서비스의 관리자 기능 구현
- [API 소스코드(서버파일)](https://drive.google.com/file/d/1YtwSlop9tB9rJSqHeIM8NjU4tItfTBIS/view?usp=sharing)

<br>

## 데모 영상

- https://drive.google.com/file/d/1kHpgP8jYR1UFvPIVUePjFUinjjm9gzlA/view?usp=sharing

<br>

## 목차

- [실행 방법](#실행-방법)
- [폴더 구조](#폴더-구조)
- [프로젝트 기능 구현](#프로젝트-기능-구현)
- [프로젝트 설명](#프로젝트-설명)
- [회고](#회고)

<br>

<br>

## 실행 방법

```
$ git clone https://github.com/pre-on-boarding-fe-7team/pre-onboarding-assignment-week-4-1-team-7.git
```

```
/* step 1 */

 API 소스코드(서버파일)를 다운받는다.


/* step 2 */

 서버파일에서
 $ npm i
 $ npm run gen
 $ npm start


/* step 3 */

 프로젝트 파일에서
 $ npm i
 $ npm start

```

<br>

## 폴더 구조

<details><summary>폴더 구조
</summary>

```
📦src
 ┣ 📂api
 ┃ ┣ 📜api.js
 ┃ ┗ 📜data.json
 ┣ 📂common
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAxios.js
 ┃ ┃ ┗ 📜useQeuryStringParams.jsx
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜async.utill.js
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜constant.js
 ┃ ┃ ┣ 📜field.util.js
 ┃ ┃ ┣ 📜masking.js
 ┃ ┃ ┗ 📜token.js
 ┣ 📂components
 ┃ ┣ 📂Earning
 ┃ ┃ ┗ 📜Earning.jsx
 ┃ ┣ 📂FilterSelect
 ┃ ┃ ┗ 📜FilterSelect.jsx
 ┃ ┣ 📂Loading
 ┃ ┃ ┗ 📜Loading.jsx
 ┃ ┣ 📂SearchBar
 ┃ ┃ ┗ 📜SearchBar.jsx
 ┃ ┣ 📜Footer.jsx
 ┃ ┣ 📜Header.jsx
 ┃ ┗ 📜Sider.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useInputs.js
 ┣ 📂modules
 ┃ ┣ 📜accountSlice.js
 ┃ ┣ 📜accountsSlice.js
 ┃ ┣ 📜store.js
 ┃ ┣ 📜userDetailSlice.js
 ┃ ┣ 📜userSettingSlice.js
 ┃ ┗ 📜usersSlice.js
 ┣ 📂pages
 ┃ ┣ 📂Accounts
 ┃ ┃ ┣ 📂AccountList
 ┃ ┃ ┃ ┗ 📜AccountList.jsx
 ┃ ┃ ┣ 📜AccountPagination.jsx
 ┃ ┃ ┗ 📜Accounts.jsx
 ┃ ┣ 📂AccountsDetail
 ┃ ┃ ┣ 📂Account
 ┃ ┃ ┃ ┣ 📜Account.jsx
 ┃ ┃ ┃ ┗ 📜AccountInputs.jsx
 ┃ ┃ ┗ 📜AccountDetail.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂NotFound
 ┃ ┃ ┗ 📜NotFound.jsx
 ┃ ┣ 📂UserDetail
 ┃ ┃ ┣ 📜UserAccountList.jsx
 ┃ ┃ ┣ 📜UserDetail.jsx
 ┃ ┃ ┗ 📜UserForm.jsx
 ┃ ┗ 📂Users
 ┃ ┃ ┣ 📜UserList.jsx
 ┃ ┃ ┗ 📜Users.jsx
 ┣ 📂styles
 ┃ ┗ 📜theme.js
 ┣ 📜App.js
 ┣ 📜App.style.js
 ┗ 📜index.js

```

</details>

<br>

---

<br>

## 프로젝트 기능 구현

- 계좌 목록
  - accounts를 조회하여 리스트 형식으로 출력
  - 계좌번호는 브로커에 따라 포맷을 변경하고 앞,뒤 두자리를 제외한 모든 숫자를 마스킹
  - 평가금액은 수익률에 따라서 빨강, 파랑, 검정으로 표시
  - 상단의 검색 input, select를 통해 필터링 가능
  - 계좌번호 클릭 시 계좌 정보로 이동
  - 고객명 클릭 시 해당 사용자 정보로 이동
- 계좌 정보
  - 계좌에 대한 모든 정보 출력
  - 계좌번호를 클릭하면 계좌명, 계좌활성화여부, 계좌상태는 수정 가능하도록 설정
- 헤더
  - 현재 페이지명을 헤더 왼쪽에 표시
  - 로그아웃 버튼과 현재 사용자 아이디를 헤더 오른쪽에 표시
- 사이더

  - 계좌, 사용자 메뉴 표시 및 클릭 시 해당 페이지로 이동하도록 구현
  - 현재 선택되어 있는 메뉴 활성화 표시

- 푸터
- 로그인
  - 로컬스토리지로 로그인 유지
- 사용자 목록, 사용자 상세
  - 고객명, 휴대폰번호 마스킹 처리
  - 잘못 생성한 사용자를 삭제 가능
  - json-server 의 Full-text Search API를 사용하여 검색 구현
  - json-server 의 Paginate API 를 사용하여 페이지네이션 구현
  - 기본 사용자 정보와 임직원 계좌 여부, 활성화 여부 표현
  - 사용자 클릭시 사용자 상세정보로 이동
  - 상세 정보에서 개명을 한 사용자를 위해 사용자명을 변경가능

<br>

<br>

## 프로젝트 설명

<br>

### 기술 스택

- React
- Redux-toolkit
- Mui

<br>

<br>

### 👍 **Best Practice**

1. Redux-toolkit 사용 이유

- 보일러플레이트 코드를 줄일 수 있기 때문에 사용했다. 보일러프레이트 코드가 많으면 해석이 어려워지고 예측이 힘들어진다.
- immer, reselect 등 여러가지 라이브러리가 내장되어 있어서 패키지 의존성을 줄여준다.
- reducer를 생성하는것이 쉬워진다.

2. 리듀서를 생성하는 공통함수

- 각 slice에서 action별 리듀서를 생성하는 공통 부분을 async.util.js에 공통 함수로 생성했다.
  - createExtraReducers 함수는 action별 리듀서를 생성한다.
  - handleAsyncAccountsState 함수는 type에 따라 state를 변경한다.
  - 위 공통 함수들을 통해 각 slice의 반복되는 코드를 줄여 코드 해석이 좀 더 쉬워지도록 했다.

3. TokenStorage, Auth, ApiService를 class형식으로 구현

- Dependency Injection 형식으로 종속성이 감소하여 서비스 간의 결합이 줄어들게된다. 때문에 만약 클래스 내부에서 변경사항이 있더라도 필요한 부분만 수정하여 해당 코드를 그대로 사용이 가능하고 재사용성이 증가한다.
- 종속성을 쉽게 파악할 수 있게 된다.
- 일반적인 함수같은 경우는 불러올때마다 메모리를 사용하는 반면, 인스턴스를 최상위 컴포넌트에 생성한 후, 하위 컴포넌트 등에서 인스턴스가 생성된 클래스 내부의 메소드를 사용하면 인스턴스가 이미 생성되어서 추가적인 메모리를 사용하지 않는다.

<br>

## 회고

- 이번 과제는 데이터를 어떻게 조합하고 보여주느냐에 대한 점이 가장 큰 관건이었다. 특히 사용자 목록에서 세개의 데이터를 조인하여 보여주고 싶은 데이터만 필터링 하는 부분이 어렵게 느껴져 구현하지 못한 점이 아쉬웠다. 프론트엔드 영역에서도 정제된 데이터에서 뿐만 아니라 제공된 기본 데이터의 조합으로 원하는 데이터를 만들어 내는 연습이 더 필요하다는 것을 깨닫게 되었다.
