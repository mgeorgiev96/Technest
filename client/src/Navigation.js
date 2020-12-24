import {React,useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link} from 'react-router-dom'
import {ShopContext} from './Context'

function Navigation() {
    const [cart,setCart,user,setUser,shop,setShop,itemID,setItemID,itemData,setItemData,total,setTotal] = useContext(ShopContext)
    const showMenu = ()=>{
        let navbar = document.querySelector('.navbar')
        let toggler = document.querySelector('.fas')
        if(navbar.classList.contains('navbar_show_toggler')){
            navbar.classList.remove('navbar_show_toggler')
            toggler.style.animation = 'moveToggler 750ms infinite'
            toggler.classList.add('idle_toggler')
            toggler.classList.remove('move_toggler')
        }else{
            navbar.classList.add('navbar_show_toggler')
            toggler.style.animation = 'none'
            toggler.classList.remove('idle_toggler')
            toggler.classList.add('move_toggler')
        }
    }


    return (
        <div className='navbar_container'>
            <Navbar expand="lg" variant='dark'>
                <Navbar.Brand><Link to='/api/profile'>Technest</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <Nav.Item><Link to='/api/shop'>Shop</Link></Nav.Item>
                        <Nav.Item><Link to='/api/cart'>Cart</Link></Nav.Item>
                        <Nav.Item><Link to='/api/favourites'>Favourites</Link></Nav.Item>
                        <Nav.Item><Link to='/api/purchase-history'>Purchase History</Link></Nav.Item>
                    </NavDropdown>
                    <Nav.Link href="/api/logout">Logout</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link>Welcome {user.name}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <i onClick={showMenu} className="fas fa-bars idle_toggler"></i>
        </div>
    )
}


export default Navigation;