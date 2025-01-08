# 코딩애플_Next.JS_Part1.애플후레쉬
## 01.Next.js 많이 쓰는 이유를 알아보자
- **sever-side rendering**을 사용하며 
  - server-side rendering은 html을 서버에서 만드는 짓 (≠client-side rendering)
  - 풀스택 프레임워크 ( 프론트엔드 + 백엔드 둘 다 가능 )
<br/>

## 02.Next.js 설치와 개발환경 셋팅
- `cd Desktop`
- `npx create-next-app@14`
  - project 이름 설정
  - TypeScript, ESLint, 'src' directory 사용여부 No 체크
  - App router 사용여부 yes 체크
- `cd project이름`
- `code . -r`
- **public**, **app/api** 생성
- 파일/폴더더 설명
  - app/page.js : 메인 페이지 (React문법 사용)
  - app/layout.js : page.js를 감싸는 파일 (head태그나 상단메뉴 등 넣는 페이지)
  - globals.css : 모든페이지에 css적용
  - xxx.module.css : 특정 페이지에만 적용 
  - api폴더 : 서버기능 만드는 곳
  - public폴더 : 이미지,폰트 등 소스코드 외의 파일 보관용
<br/>

## 03.페이지 레이아웃 만들기(React 기초 문법)
- page.js에 main page 작성
  - 제일 바깥 태그는 형제 태그를 가질 수 없다.
  - 태그의 **class**는 **className** 으로 대체한다.
  - html 내에서 style 부여 시 **style={{ }}** 속성을 사용한다.
  - html에 js변수를 선언할 수 있다. (데이터 바인딩)
  - html에 선언된 js변수는 {}를 이용해 어디든 사용 가능하다.
  ```js
  export default function Home() {
    let name = "Wholesome-Gee" /*변수 선언*/
    return (
      <div>
        <h4 className="title">McDonald</h4>  <!-- className으로 class지정 -->
        <p style={{ textAlign:'center', fontSize:'16px' }}>Made by {name}</p>  <!-- style={{ 속성:'값', ... }}  /  {변수사용}-->
      </div>
    )
  }
  ```
- globals.css에 css 작성
  ```css
  body {
    margin: 0;
    background-color: #da2d30;
    color: #FFC300;
  }

  .title {
    text-align: center;
    margin-top: 150px;
    font-size: 40px;
  }
  ```
<br/>

## 04.여러 페이지 만들기(라우팅)
- 라우팅 : url로 페이지를 나누는 것
- Next JS에는 자동 라우팅 기능이 있어서 폴더 하나, 파일 하나만 만들면 된다.
- app/list/page.js 생성 (list component 생성)
  ```js
  // 기본 형식
  export default function Home() {
    return (
      <div>

      </div>
    )
  }
  ```
- navbar, footer 같은 component는 layout.js에 작성
  ```js
  import Link from "next/link";

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="navbar">
          <!-- Link 태그는 a태그보다 새로고침 없이 부드럽게 동작 (import 필수) -->
          <Link href="/">홈</Link>
          <Link href="/list">List</Link>
        </div>
          {children}
        </body>
      </html>
    );
  }
  ```
- NextJS는 page.js와 같은경로에 layout.js가 있으면 layout.js 안에 page.js를 담아서 보여준다.
  - layout.js 내의 `{children}`이라고 표기 된 부분이 page.js가 들어갈 부분이다.
- page.js와 같은경로에 layout.js가 있고 이들의 상위 폴더에 layout.js가 또 있다면,  
  NextJS는 상위폴더 layout.js안에 layout.js를 담고 page.js를 담아서 보여준다.
- app/cart/page.js 생성
  ```js
  export default function Home() {
    return (
      <div>
        <h1>장바구니 페이지 입니다.</h1>
      </div>
    )
  }
  ```
- app/cart/payment/page.js 생성
  ```js
  export default function Home() {
    return (
      <div>
        <h1>결제 페이지 입니다.</h1>
      </div>
    )
  }
  ```
- app/cart/layout.js 생성
  ```js
  export default function Layout({ children }) {
    return (
      <div>
          {children}
          <p>현대카드 무이자 이벤트중</p>
      </div>
    );
  }
  ```
  - 해당 layout.js는 cart폴더 내의 모든 page.js에 적용됨

<br/>

## 05.html을 반복문으로 줄이고 싶으면 map
<br/>

## 06.Next.js에서 이미지 넣는 법 2개
<br/>

## 07.client/server component, import 문법
<br/>

## 08.Component에 데이터 전해주려면 props
<br/>

## 09.좋아요 버튼 만들기 (useState, onClick)
<br/>

## 10.좋아요 버튼 만들기2 (array, object state변경하려면)
<br/>
