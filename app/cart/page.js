import Hello from "./hello"

export default function Cart() {
  let cart = ['Cheese burger','Big Mac','McSpicy Sanghai burger']
  return (
    <div>
      <h4 className="title">Cart</h4>
      <Hello/>
      <CartItem item={cart[0]}/>
      <CartItem item={cart[1]}/>
      <CartItem item={cart[2]}/>
      <Btn color="red"/>
      <Btn color="blue"/>
    </div>
  )
} 

function Btn(props) {
  return <button style={{ backgroundColor:props.color}}>버튼</button>
}

function CartItem(props) {
  return (
    <div className="cart-item">
      <p>{props.item}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  )
}
