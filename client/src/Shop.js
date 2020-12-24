import {React,useContext} from 'react'
import {ShopContext} from './Context'
import Item from './Item'

function Shop() {

    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData] = useContext(ShopContext)
    return (
        <div className='shop_container'>
            {shop!==''? shop.map(item=><Item key={item.id} id={item.id} price={item.price} title={item.name} image={item.images[0]}/>) : ''}
        </div>
    )
}

export default Shop;
