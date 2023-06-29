import React from 'react';
import ContentLoader from 'react-content-loader'
import './Сard.scss' 

function Card({id, ImageURL, title, price, onPlus, onFavorite, favorited=false, loading=false}){

    //?Зміна картинки (плюса на галочку) при кліку на нього і додавання елементів в корзину
    const [isAdded, setIsAdded] = React.useState(false) 
    const onClickPlus = () =>{
        onPlus({id, title, ImageURL, price})
        setIsAdded(!isAdded)
    }
    //?Додавання елементів в обране
    const [isFavorite, setIsFavorite]=React.useState(favorited)
    const onClickFavorite=()=>{
        onFavorite({id, title, ImageURL, price});
        setIsFavorite(!isFavorite);
    }
    
    return(
        <div className='card'>
            {
                loading ? (<ContentLoader 
                speed={2}
                width={180}
                height={260}
                viewBox="0 0 180 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                >
                <rect x="1" y="0" rx="10" ry="10" width="180" height="155" /> 
                <rect x="0" y="195" rx="5" ry="5" width="100" height="15" /> 
                <rect x="0" y="234" rx="5" ry="5" width="90" height="25" /> 
                <rect x="150" y="230" rx="10" ry="10" width="30" height="30" /> 
                <rect x="0" y="170" rx="5" ry="5" width="170" height="15" />
                </ContentLoader>
                ) : (
                <>
                <img className='card__heart' src={isFavorite ? 'IMG/ICON/liked.png':'IMG/ICON/heart.png'} onClick={onClickFavorite}></img>
                <img className='card__img' src={ImageURL}></img>
                <div className='card__title'>{title}</div>
                    <div className='title__wrap'>
                        <div className='price__wrap'>
                            <p>Ціна:</p>
                            <b>{price}<span>грн.</span></b>
                        </div>
                        <img className='plus' onClick={onClickPlus} src={isAdded ? 'IMG/ICON/added.png':'IMG/ICON/plus.png'} alt='Plus'></img>
                    </div>
                </>
                )
            }
        </div>
    )
}

export default Card