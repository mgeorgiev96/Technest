import {ShopProvider} from './Context'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Navigation from './Navigation'
import Profile from './Profile';
import Shop from './Shop'
import './css/style.css'
import Cart from './Cart';
import ItemInfo from './ItemInfo';
import Favourites from './Favourites';
import History from './History'

function App() {
  console.log(process.env.MONGO_DB)
  console.log(process.env)
  return (
    <ShopProvider>
      <Router>
        <div className="App">
          <h1>Martin</h1>
          <h3>{process.env.MONGO_DB}</h3>
          <Navigation/>
          <Route path='/api/profile' component={Profile}></Route>
          <Route path='/api/shop' component={Shop}></Route>
          <Route path='/api/cart' component={Cart}></Route>
          <Route path='/api/item-info' component={ItemInfo}></Route>
          <Route path='/api/favourites' component={Favourites}></Route>
          <Route path='/api/purchase-history' component={History}></Route>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
