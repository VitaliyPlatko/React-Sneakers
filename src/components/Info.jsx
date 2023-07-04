import React from 'react'
import {AppContext} from '../Context'

const Info = ({title, discription, image}) => {
    
    const {setCartOpened} = React.useContext(AppContext)

    return (
        <div className='cardEmpty'>
            <img className='cardEmptyIMG' src={image} alt='cartemptyimg'></img>
            <h2>{title}</h2>
            <p>{discription}</p>
            <button onClick={()=>setCartOpened(false)} className='totalBTN'>Повернутись назад</button>
        </div>
    )
}

export default Info