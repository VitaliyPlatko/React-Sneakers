import './menu__right.scss'

function Overlay({onClose, items, onRemove}){
    return(
        <div className='overlay'>
        <div className='drawer'>
        <div className='wrap-buttom'>
          <h2>Корзина</h2>
          {/*Пропс закрвиає корзину при натисканні на хрестик*/}
          <img onClick={onClose} className='remove' src='IMG/ICON/remove3.png' alt='remove'></img>
        </div>
          {/*Елементи в корзині*/}
            <div className='Item'>
              {items.map((obj)=>(
                  <div className='cartItem'>
                  <img className='cardIMG' src={obj.ImageURL} alt='photo'></img>
                    <div className='text-wrap'>
                      <p>{obj.title}</p>
                      <b>{obj.price} грн</b>
                    </div>
                    <img onClick={()=>onRemove(obj.id)} className='remove' src='IMG/ICON/remove.png' alt='remove'></img>
                  </div>
              ))}
            </div>

            {/*низ корзини*/}
            <div className='Total'>
              <div className='wrap-buttom'>
                <div className='suma'>Сума</div>
                <div className='price'>123<span>грн.</span></div>
              </div>
              <div className='wrap-buttom'>
                <div className='tax'>Податок</div>
                <div className='price'>123<span>грн.</span></div>
              </div>
              <button>Підтвердити замовлення</button>
            </div>
        </div>
      </div>
    )
}

export default Overlay