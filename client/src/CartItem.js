import {React,useContext} from 'react'
import {ShopContext} from './Context'


function CartItem(props) {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
    console.log(process.env.MONGO_DB)
    const deleteCartItem = (e)=>{
        let target = e.target
        let cartArray = cart
        let price = cartArray.filter(item=>item.id===target.parentElement.className)
        cartArray = cartArray.filter(item=>item.id!==target.parentElement.className)
        setCart(cartArray)
        setTotal(total-price[0].price)
        

    }
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td className='img_holder'><img src={props.image}></img></td>
            <td>{props.name}</td>
            <td>{props.price}$</td>
            <td className={props.id}><i className="fas fa-trash" onClick={deleteCartItem}></i></td>
        </tr>
    )
}

export default CartItem;