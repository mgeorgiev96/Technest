import {React,useContext} from 'react'
import axios from 'axios'
import {ShopContext} from './Context'

function HistoryItem(props) {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
    const deleteItem = (e)=>{
        let target = e.target
        axios.post('/api/delete-payment',{
            username: user.username,
            id: target.parentElement.className
        }).then(res=>{
            setUser(res.data)
        })
    }
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.name}</td>
            <td>{props.amount}$</td>
            <td className={props.id}><i onClick={deleteItem} className="fas fa-trash"></i></td>
        </tr>
    )
}

export default HistoryItem;
