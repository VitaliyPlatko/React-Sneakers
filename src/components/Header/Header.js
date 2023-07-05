import React from 'react';
import './header.scss'
import {Link} from "react-router-dom";
import {useCart} from '../../hooks/useCart';

function Header(props){
    const {totalPrice} = useCart()

    return(
        <div className="header">
            <Link to={'/'} className='link'>
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
                    <div className="price">{totalPrice} <span>$</span></div>
                    <Link to='/Favorites' className='link'>
                        <img className="favorite" src='IMG/ICON/black-heart.png' alt='Закладки'></img>
                    </Link>
                    <Link to={'/Orders'}>
                        <img className="person" src="IMG/ICON/person.png" alt="Персона"></img>
                    </Link>
                
            </div>
        </div>
    )
}

export default Header