import {React,useContext} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {ShopContext} from './Context'
import CartItem from './CartItem'
import axios from 'axios'
import moment from 'moment'

function Cart() {
  const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
  const handleToken = (token)=>{
    axios.post('/api/payment',{
      username: user.username,
      email: token.email,
      price: total,
      token: token.id,
      description: `Transaction made on ${moment(Date.now()).format('LLLL')}.`
    }).then(res=>{
      setUser(res.data)
      setCart([])
      setTotal(0)
    })

  }
    return (
      <div className="cart_container">           
          <table className="table table-bordered border-light table-dark">
              <thead>
                  <tr>
                      <th className='heading_col' scope='col' colspan="5">Total - {total.toFixed(2)}$ <br></br><StripeCheckout className="stripe_button"
          token={handleToken}
          stripeKey="pk_test_51GxXTwJWnlXzpGEmHhKz3nGdCrzRjY8QE4fuYMo6CNYAuJXIQCDMy2LXCAVyTbME9zrYK60HxAjBEaE9ulvYSRJ700jdk4z5x2"
          billingAddress
          shippingAddress
          description={`TechHut - ${total}$`}
          image="https://stripe.com/img/documentation/checkout/marketplace.png"
          amount={total * 100}
          currency='USD'
          /></th>
                  </tr>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col" colspan="2">Price</th>
                  </tr>
              </thead>
              <tbody>
                  {cart? cart.map((item,i)=><CartItem id={item.id} index={i} image={item.images[0]} name={item.name} price={item.price}/>):''}
              </tbody>
          </table>
      </div>
    )
}

export default Cart;
