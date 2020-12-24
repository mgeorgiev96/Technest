import {React,useContext} from 'react'
import FavouriteItem from './FavouriteItem'
import {ShopContext} from './Context'

function Favourites() {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData] = useContext(ShopContext)
    return (
        <div className='favourite_container'>
            <table className="table table-bordered border-light table-dark">
                <thead>
                    <tr>
                        <th className='heading_col' scope='col' colspan="5">Favourites</th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col" colspan="2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {user? user.favourites.map((item,i)=><FavouriteItem id={item.id} index={i} image={item.images} name={item.name} price={item.price}/>):''}
                </tbody>
            </table>
        </div>
    )
}


export default Favourites;