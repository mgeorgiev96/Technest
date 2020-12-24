import {React,createContext,useState, useEffect} from 'react'
import axios from 'axios'


export const ShopContext = createContext()

export const ShopProvider = (props)=>{

    const [cart,setCart] = useState([])
    const [total,setTotal] = useState(0)
    const [user,setUser] = useState('')
    const [shop,setShop] = useState('')
    const [itemID,setItemID] = useState('')
    const [itemData,setItemData] = useState('')

    useEffect(()=>{
        axios.get('/api/storage').then(res=>{
           setShop(res.data.items)
           setUser(res.data.user)

       })
    },[])

    return (
        <ShopContext.Provider value={[cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal]}>
           {props.children}
        </ShopContext.Provider>
    )
}
