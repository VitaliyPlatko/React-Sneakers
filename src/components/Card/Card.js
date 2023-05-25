import React from 'react';
import './Сard.scss' 
//!-----------------------------------------------------------
function Card({id, ImageURL, title, price, onPlus, onFavorite, favorited=false}){
//!-----------------------------------------------------------
    //*----------------------------------------------------------------------------------------------------------------//
    //?Зміна картинки (плюса на галочку) при кліку на нього і додавання елементів в корзину
    const [isAdded, setIsAdded] = React.useState(false)
    const onClickPlus = () =>{onPlus({title, ImageURL, price})
        setIsAdded(!isAdded)
    }
    //!-------------------------------------------------------
    //?Додавання елементів в обране
    const [isFavorite, setIsFavorite]=React.useState(favorited)
    const onClickFavorite=()=>{
        onFavorite({title, ImageURL, price});
        setIsFavorite(!isFavorite);
    }
    //!-------------------------------------------------------
    //*----------------------------------------------------------------------------------------------------------------//

    return(
        <div className='card'>
        <img className='card__heart' src={isFavorite ? 'IMG/ICON/liked.png':'IMG/ICON/heart.png'} onClick={onClickFavorite}></img>
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