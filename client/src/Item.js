import {React,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import {Link} from 'react-router-dom'
import {ShopContext} from './Context'

function Item(props) {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData] = useContext(ShopContext)
    const itemDataID = (e)=>{
        let target= e.target
        setItemID(target.className)
    }
    return (
        <Card>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text><strong>{props.price}$</strong></Card.Text>
            <Link className={props.id} onClick={itemDataID} to='/api/item-info'>Read More</Link>
            
        </Card.Body>
    </Card>
    )
}

export default Item;
