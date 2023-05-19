import './Сard.scss' 
import React from 'react';

function Card({onFavorite, ImageURL, title, price, onPlus}){
    {/*Зміна картинки (плюса на галочку) при кліку на нього*/}
    const [isAdded, setIsAdded] = React.useState(false)
    
    {/*Функція буде додавати елементи в корзину і змінювати + на галочку*/}
    const onClickPlus = () =>{
        onPlus({title, ImageURL, price})
        setIsAdded(!isAdded)
    }

    return(
        <div className='card'>
        <img className='card__heart' src="IMG/ICON/heart.png" alt='heart' onClick={onFavorite}></img>
        <img className='card__img' src={ImageURL}></img>
        <div className='card__title'>{title}</div>
            <div className='title__wrap'>
                <div className='price__wrap'>
                    <p>Ціна:</p>
                    <b>{price}<span>грн.</span></b>
                </div>
                {/*При натисканні на onClickPlus буде вмкликатись функція, яка буде змінювати плюс на галочку і додавати обєкти в корзину*/}
                <img className='plus' onClick={onClickPlus} src={isAdded ? 'IMG/ICON/added.png':'IMG/ICON/plus.png'} alt='Plus'></img>
            </div>
        </div>
    )
}

export default Card