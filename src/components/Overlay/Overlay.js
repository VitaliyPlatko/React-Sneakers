import React from 'react'
import './menu__right.scss'
import { AppContext } from '../../Context';
import Info from '../Info';
import axios from 'axios';

const delay = (ms) => new Promise((resolve)=>setTimeout(resolve, ms))

function Overlay({onClose, items=[], onRemove}){

  const {cartItems ,setCartItems} = React.useContext(AppContext)
  const [isOrderComplete, setIsOrderComplete]=React.useState(false);
  const [orderId, setOrderId]=React.useState(null);
  const totalPrice = cartItems.reduce((sum, obj)=>obj.price+sum, 0)

  const onClickOrder = async ()=>{
    try {
      const { data } = await axios.post('https://64970a4a83d4c69925a35c43.mockapi.io/Orders', {
        items: cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://64610008185dd9877e34f663.mockapi.io/cart' + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('Не вдалось створити замовлення')
    }
  }
  
    return(
        <div className='overlay'>
        <div className='drawer'>
          <div className='wrap-buttom'>
            <h2>Корзина</h2>
            {/*Пропс закрвиає корзину при натисканні на хрестик*/}
            <img onClick={onClose} className='remove' src='IMG/ICON/remove3.png' alt='remove'></img>
          </div>
        {items.length > 0 ?(
        <div>
          <div className='Item'>
              {items.map((obj)=>(
                  <div key={obj.id} className='cartItem'>
                  <img className='cardIMG' src={obj.ImageURL} alt='photo'></img>
                    <div className='text-wrap'>
                      <p>{obj.title}</p>
                      <b>{obj.price} грн</b>
                    </div>
                    <img onClick={()=>onRemove(obj.id)} className='remove' src='IMG/ICON/remove.png' alt='remove'></img>
                  </div>
              ))}
            </div>
            <div className='Total'>
              <div className='wrap-buttom'>
                <div className='suma'>Сума</div>
                <div className='price'>{totalPrice}<span>грн.</span></div>
              </div>
              <div className='wrap-buttom'>
                <div className='tax'>Податок</div>
                <div className='price'>{totalPrice / 100 * 5}<span>грн.</span></div>
              </div>
              <button className='totalBTN' onClick={onClickOrder}>Підтвердити замовлення</button>
            </div>
        </div>
        ):(
            <Info
              title={isOrderComplete ? 'Замовлення оформлене' : 'Корзина пуста'}
              discription={isOrderComplete 
                ? `Ваше замовлення #${orderId} буде передане курєрській доставці`
                : 'Додайте хоча б 1 пару кросіок щоб зробити замовлення'
              }
              image={isOrderComplete ? '/IMG/ICON/orderComplete.png':'/IMG/ICON/empty-box.jpg'}
            />
        )}
        </div>
      </div>
    )
}

export default Overlay