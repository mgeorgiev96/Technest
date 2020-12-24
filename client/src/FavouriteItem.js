import {React,useContext} from 'react'
import {ShopContext} from './Context'
import axios from 'axios'

function FavouriteItem(props) {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData] = useContext(ShopContext)
    const deleteFavourite = (e)=>{
        let target = e.target
        axios.post('/api/remove-favourite',{
            id: target.parentElement.className,
            user: user.username
        }).then(res=>{
            setUser(res.data)
        })

    }
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td className='img_holder'><img src={props.image}></img></td>
            <td>{props.name}</td>
            <td>{props.price}$</td>
            <td className={props.id}><i className="fas fa-trash" onClick={deleteFavourite}></i></td>
        </tr>
    )
}

export default  FavouriteItem;
