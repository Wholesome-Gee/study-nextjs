'use client'; // client component 선언 (useEffect, useState, eventhandler 사용가능)

// useState는 state함수에 의해 state변수의 데이터가 변경되면, html을 재렌더링 해줌.
import { useState } from "react";

// Image component를 import해서 layout shift 현상 방지
// Image component를 사용하기 위해선 image파일을 모두 import 해야함
// import Image from "next/image"
// import burger0 from './public/Big-Mac.png'


export default function Home() {
  let hamburgers = ['Cheesse Burger', 'Big Mac', 'McSpicy Sanghai Burger' ]
  // useState로 quantity state변수, changeQuantity state함수 선언
  // quantity state변수의 데이터(값)은 0
  let [quantity,changeQuantity] = useState([6,9,3])
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
              {/* changeQuantity state함수의 ()안에 실행문을 입력 */}
              {/* state험수는 ()안의 데이터가 변경이 있을 시 실행문을 실행함. */}
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