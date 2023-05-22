import './header.scss'
import {Link} from "react-router-dom";

function Header(props){
    return(
        <div className="header">
            <Link to={'/'}>
                <div className="header__menu-left">
                    <img className="logo" src="IMG/ICON/logo.png" alt='logo'></img>
                        <div className="header__wrapper">
                            <h1 className="header__title">REACT SNEAKERS</h1>
                            <div className="header__discription">магазин найкращих кросівок</div>
                        </div>                
                </div>
            </Link>
            <div className="header__menu-right">
                <img className="cart" src="IMG/ICON/cart.png" onClick={props.onClickCart} alt="Корзина"></img>
                    <div className="price">1231 <span>$</span></div>
                    <Link to='/Favorites'>
                        <img className="favorite" src='IMG/ICON/black-heart.png' alt='Закладки'></img>
                    </Link>
                <img className="person" src="IMG/ICON/person.png" alt="Персона"></img>
            </div>
        </div>
    )
}

export default Header