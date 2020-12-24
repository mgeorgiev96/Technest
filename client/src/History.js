import {React,useContext} from 'react'
import {ShopContext} from './Context'
import HistoryItem from './HistoryItem'

function History() {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
    return (
        <div className='history_container'>
            <table className="table table-bordered border-light table-dark">
                <thead>
                    <tr>
                        <th className='heading_col' scope='col' colspan="5">History</th>
                    </tr>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" colspan="2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {user? user.history.map((purchase,i)=><HistoryItem id={purchase.id} index={i+1} name={purchase.description} amount={purchase.amount}/>):""}
                </tbody>
            </table>
        </div>
    )
}


export default History;