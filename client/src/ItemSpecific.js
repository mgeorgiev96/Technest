import {React,useContext} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {ShopContext} from './Context'
import axios from 'axios'
import uniqid from 'uniqid'

function ItemSpecific(props) {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
    const  saveFavourite = ()=>{
        axios.post('/api/save-favourite',{
            item: {
                id: itemData.id,
                images: itemData.images[0],
                name: itemData.name,
                price: itemData.price
            },
            user: user.username
        }).then(res=>{
            setUser(res.data)
        })
    }
    const addToCart = ()=>{
        let cartArray = cart
        let item = itemData
        cartArray.push({
            id: uniqid(),
            images: itemData.images,
            name: itemData.name,
            price: itemData.price,
            description: itemData.description

        })
        setCart(cartArray)
        setTotal(total + itemData.price)
    }
    return (
        <div className='item_specific'>
            <div className='item_description'>
                <h3>{props.name}</h3>
                <ul>
                    {props.description ? props.description.map(desc=><li>{desc}</li>) : ''}
                </ul>
            </div>
            <Carousel>
                <Carousel.Item>
                    <span>{props.price}$</span>
                    <img
                    className="d-block w-100"
                    src={props.image[0]}
                    alt="First slide"
                    />
                    <i onClick={addToCart} className="fas fa-cart-plus"></i>
                    <i className="fas fa-heart" onClick={saveFavourite}></i>
                </Carousel.Item>
                <Carousel.Item>
                   <span>{props.price}$</span>
                    <img
                    className="d-block w-100"
                    src={props.image[1]}
                    alt="Second slide"
                    />
                    <i onClick={addToCart} className="fas fa-cart-plus"></i>
                    <i onClick={saveFavourite} className="fas fa-heart"></i>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ItemSpecific;
