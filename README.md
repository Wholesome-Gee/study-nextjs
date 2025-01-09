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
- Next JS의 html 작성란에는 if문, for문을 사용할 수 없음
- Next JS의 html 작성란에는 map함수를 사용할 수 있음
- app/list/page.js에 map함수 적용
  ```js
  export default function Home() {
    let hamburgers = ['Cheesse Burger', 'Big Mc', 'Spicy Chicken Burger' ]

    return (
      // JSX의 html에선 for, if 사용 불가 / map함수 사용 가능
      <div>
        <h4 className="title">상품목록</h4>
        // { 변수명.map(function(item,index) { return <div></div>}
        {
          hamburgers.map((hamburger,index)=>{
            return (
              <div className="food" key={index}>
                <h4>{hamburger} ${index+5}</h4>
              </div>
            )
          })
        }
      </div>
    )
  }
  ```
  - React문법에선 반복문을 사용할때 key속성을 권장함 (보통 index사용)
- 
<br/>

## 06.Next.js에서 이미지 넣는 법 2개
- `<img src='' alt=''/>`
- public폴더 내부 자료들은 런타임 시 자동으로 root경로로 이동 됨.
- img태그는 간편하나 layout shift현상을 막지 못함.   
    (layout shift현상은 img를 불러오는동안 layout이 무너지는 현상)
  ```js
  export default function Home() {
    let hamburgers = ['Cheesse Burger', 'Big Mac', 'McSpicy Sanghai Burger' ]

    return (
      // JSX의 html에선 for, if 사용 불가 / map함수 사용 가능
      <div>
        <h4 className="title">상품목록</h4>
        {
          hamburgers.map((hamburger,index)=>{
            return (
              <div className="food" key={index}>
                {/* public폴더안에 있는 자료들은 런타임 시 자동으로 root경로로 이동함. img태그는  layout shift현상은 방지 못함 */}
                <img src={`/burger${index}.png`} className="burger-img" alt={hamburger}/>
                <h4>{hamburger} ${index+5}</h4>
              </div>
            )
          })
        }
      </div>
    )
  }
  ```
- Image component는 layout shift현상을 방지할 수 있음
  - Image component를 사용하려면 Image component와 사용할 image들을 모두 import 해야함.
  ```js
  // Image component를 사용하기 위해선 image파일을 모두 import 해야함
  import Image from "next/image"
  import burger0 from '/public/burger0.png'
  import burger1 from '/public/burger1.png'
  import burger2 from '/public/burger2.png'


  export default function Home() {
    let hamburgers = ['Cheesse Burger', 'Big Mac', 'McSpicy Sanghai Burger' ]

    return (
      // JSX의 html에선 for, if 사용 불가 / map함수 사용 가능
      <div>
        <h4 className="title">상품목록</h4>
        {
          hamburgers.map((hamburger,index)=>{
            return (
              <div className="food" key={index}>
                <Image src={`burger${index}`} className="burger-img"/>
                <h4>{hamburger} ${index+5}</h4>
              </div>
            )
          })
        }

      </div>
    )
  }
  ```
  - Image component로 외부이미지 경로를 넣을 땐 width={100} height={100} 속성이 필요하고,  
    next.config.js에도 추가적인 작업이 필요함.
    ```js
    // page.js
    <Image src='https://www.mcdonalds.co.kr/upload/product/pcfile/1717486375819.png'  width={220} height={220} className="burger-img"/>

    // next.config.js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'blahblahblahblahblahblah',
            port: '',
            pathname: 'blahblahblahblahblahblah',
          }
        ]
      }
    };

    export default nextConfig;

    ```

## 07.client/server component, import 문법
- component는 길고 복잡한 html을 정리해 놓은 것
- component는 Pascal Case를 따른다.
- Next JS에서는 server component , client component로 구분 되어 있음
  - 파일 맨위에 `'use client'` 작성하면 client component, 없으면 server component
  - client component
    - html에 자바스크립트를 사용할 수 있음. (useState, useEffect, onClick 등)
    - 로딩속도가 비교적 느림 / 검색엔진 노출 비교적 불리
    - 큰 페이지 내의 작은 기능들은 client component로 제작
  - server component
    - html에 자바스크립트를 사용할 수 없음. (useState, useEffect, onClick 등)
    - 로딩속도가 비교적 빠름 / 검색엔진 노출 비교적 유리
    - 큰 페이지는 server component로 제작
- component 파일에선 `export {변수/함수명, ...}` or `epxort default 변수/함수명`를 필수로 해줘야 함

```js
// hello.js  ( Hello component )
// sever component,  페이지 맨 위에 'use client' 작성 시 client component
export default function Hello() {
  return <h1>안녕하세요</h1>
} 
```

```js
// Hello component import
import Hello from "./hello"

export default function Cart() {
  let cart = ['Cheese burger','Big Mac','McSpicy Sanghai burger']
  return (
    <div>
      <h4 className="title">Cart</h4>
      // Hello component 사용
      <Hello/>
      // CartItem component 사용용
      <CartItem item={cart[0]}/>
      <CartItem item={cart[1]}/>
      <CartItem item={cart[2]}/>
    </div>
  )
} 

// CartItem component 생성
function CartItem(props) {
  return (
    <div className="cart-item">
      <p>{props.item}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  )
}
```



<br/>

## 08.Component에 데이터 전해주려면 props
- props는 부모 component가 자식 component에게 넘겨주는 data
- props는 형제 component에게 전달할 수 없다.
  ```js
  // 부모 component
  export default function Cart() {
    let cart = ['Cheese burger','Big Mac','McSpicy Sanghai burger']
    return (
      <div>
        <h4 className="title">Cart</h4>
        // 부모 component(Cart)의 cart데이터(prop)를 자식 component(CartItem)에 전달
        <CartItem item={cart[0]}/>
        <CartItem item={cart[1]}/>
        <CartItem item={cart[2]}/>
        // 부모 component(Cart)에서 자식 component(Btn)에 color데이터(prop) 전달
        <Btn color="red"/>
        <Btn color="blue"/>
      </div>
    )
  } 
  
  //자식 component
  // 부모 component로 부터 받은 color 데이터는 props에 담긴다
  function Btn(props) {
    return <button style={{ backgroundColor:props.color}}>버튼</button>
  }
  
  //자식 component
  // 부모 component로 부터 받은 item 데이터는 props에 담긴다
  function CartItem(props) {
    return (
      <div className="cart-item">
        <p>{props.item}</p>
        <p>$40</p>
        <p>1개</p>
      </div>
    )
  }
  ```


<br/>

## 09.좋아요 버튼 만들기 (useState, onClick)
- useState()는 state변수의 데이터가 state함수에 의해 변경되었을 때, html에 자동으로 재렌더링 한다.
- useState()는 react에서 import를 해야한다.
  - ` import {useState} from 'react';`
- useState()로 변수 선언 방법
  - ` let [number, changeNumber] = useState(0)`
  ```js

  'use client'; // client component 선언 (useEffect, useState, eventhandler 사용가능)

  // useState는 state함수에 의해 state변수의 데이터가 변경되면, html을 재렌더링 해줌.
  import { useState } from "react";  // useState는 react에서 import 해야함.

  export default function Home() {
    let hamburgers = ['Cheesse Burger', 'Big Mac', 'McSpicy Sanghai Burger' ]
    // useState로 quantity state변수, changeQuantity state함수 선언
    // quantity state변수의 데이터(값)은 0
    let [quantity,changeQuantity] = useState(0)
    return (
      // JSX의 html에선 for, if 사용 불가 / map함수 사용 가능
      <div>
        <h4 className="title">상품목록</h4>
        {
          hamburgers.map((hamburger,index)=>{
            return (
              <div className="food" key={index}>
                {/* Image component를 사용하여 layout shift 현상 방지 */}
                {/* 외부이미지를 넣을때는 width={100} height={100} 속성이 필요하고 next.config.js에도 추가적인 작업이 필요함. images:{remotePatterns:[{protocol:'~',hostname:'~',port:'~',pathname:'~'}]} */}
                {/* <Image src={burger0} className="burger-img"/> */}

                {/* public폴더안에 있는 자료들은 런타임 시 자동으로 root경로로 이동함. img태그는  layout shift현상은 방지 못함 */}
                <img src={`/burger${index}.png`} className="burger-img" alt={hamburger}/>
                <h4>{hamburger} ${index+5}</h4>
                // changeQuantity state함수의 ()안에 실행문을 입력
                <button onClick={()=>{ changeQuantity(quantity-1) }}> - </button>
                <span>{quantity}</span>
                <button onClick={()=>{ changeQuantity(quantity+1) }}> + </button>
              </div>
            )
          })
        }
      </div>
    )
  }
  ```
<br/>

## 10.좋아요 버튼 만들기2 (array, object state변경하려면)
- useState에서 state변수의 데이터에는 array와 object도 할당 할 수 있다.
  - ` let [quantity,changeQuantity] = useState([3,6,9]) `
    - quantity[0] = 3, quantity[1] = 6, quantity[2] = 9
- html에서 array/object state변수의 데이터를 변경하는 방법
  - ` let copyQuantity = [...quantity]
    - arr/obj를 그대로 copyQuantity에 할당하면 arr/obj의 주소가 할당되어 copyQuantity의 요소를 변경해도 `quantity == copyQuantity` 는 **true**다.  
    - state함수는 ()안에 `기존데이터 == 변경데이터`가 **false**일 시 데이터를 변경 후 html을 재렌더링한다.  
    - arr/obj는 spread를 활용하여 변수에 할당 시 새로운 주소에 arr/obj의 데이터가 할당된다.  
      즉, `arr2 = arr1` 으로 할 시 `arr2 == arr1`는 **true**  
      `arr2 = [...arr1]` 으로 할 시 `arr2 == arr1`는 **false**
  ```js
  'use client'; // client component 선언 (useEffect, useState, eventhandler 사용가능)

  // useState는 state함수에 의해 state변수의 데이터가 변경되면, html을 재렌더링 해줌.
  import { useState } from "react";

  export default function Home() {
    let hamburgers = ['Cheesse Burger', 'Big Mac', 'McSpicy Sanghai Burger' ]
    // useState로 quantity state변수, changeQuantity state함수 선언
    // quantity state변수의 데이터(값)은 array[6,9,3]
    let [quantity,changeQuantity] = useState([6,9,3])
    return (
      // JSX의 html에선 for, if 사용 불가 / map함수 사용 가능
      <div>
        <h4 className="title">상품목록</h4>
        {
          hamburgers.map((hamburger,index)=>{
            return (
              <div className="food" key={index}>
                <img src={`/burger${index}.png`} className="burger-img" alt={hamburger}/>
                <h4>{hamburger} ${index+5}</h4>
                {/* changeQuantity state함수의 ()안에 실행문을 입력 */}
                {/* state함수는 ()안의 변경데이터가 '기존데이터==변경데이터' false일때 실행문을 실행함. */}
                <button onClick={()=>{
                  let copyQuantity = [...quantity] // array spread를 사용해야 다른 주소에 같은 배열의 값이 들어감
                  copyQuantity[index]-=1
                  changeQuantity(copyQuantity)
                }}> - </button>
                <span>{quantity[index]}</span>
                <button onClick={()=>{
                  let copyQuantity = [...quantity]
                  copyQuantity[index]+=1
                  changeQuantity(copyQuantity)
                }}> + </button>
              </div>
            )
          })
        }
      </div>
    )
  }
  ```
<br/>
