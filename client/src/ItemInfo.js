import {React,useContext, useEffect} from 'react'
import {ShopContext} from './Context'
import axios from 'axios'
import ItemSpecific from './ItemSpecific'

function ItemInfo() {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData] = useContext(ShopContext)
    useEffect(()=>{
        if(shop){
            shop.map(item=>item.id===itemID ? setItemData(item):'')
        }
    },[])
    return (
        <div>
            <div>{shop!==''? shop.map(item=>item.id === itemID ? <ItemSpecific price={item.price} name={item.name} description={item.description} image={item.images}/>:''):''}</div>
        </div>
    )
}


export default ItemInfo;