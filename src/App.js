import React from 'react';
import {Route, Routes} from "react-router";
import axios from 'axios';
import Header from './components/Header/Header'
import Overlay from './components/Overlay/Overlay'
import Card from './components/Card/Card';


import Test from './pages/Test123';
import Favorites from './pages/Favorites';


function App() {
  //*----------------------------------------------------------------------------------------------------------------//
  //?Створення масиву для відображення даних з Backend                                                          21-28
  const [items, setItems] = React.useState([]);

  //?Використовується для відкриття і закриття корзини при натиисканні на неї                                      52
  const [cartOpened, setCartOpened] = React.useState(false);

  //?Використовується для пошуку по товарах (input)                                                             55-59
  const [searchValue, setSearchValue] = React.useState('');

  //?Додавання елементів в корзину
  const [cartItems, setCartItems] = React.useState([]);
  //*----------------------------------------------------------------------------------------------------------------//


  //*----------------------------------------------------------------------------------------------------------------//
  //?Відображення даних з Backend
  React.useEffect(()=>{
    //?запит на отримання карточок з товарами 
      axios.get('https://64610008185dd9877e34f663.mockapi.io/items').then(res=>{
      setItems(res.data);
    })
    //?запит на отримання даних з корзини
      axios.get('https://64610008185dd9877e34f663.mockapi.io/cart').then(res=>{
      setCartItems(res.data);
    })
  },[])
  //*----------------------------------------------------------------------------------------------------------------//


  //*----------------------------------------------------------------------------------------------------------------//
  //?Функція додавання товару в корзину
  const onAddToCard=(obj)=>{
    //?get використовується для отримання всіх кросовок з бекенду
    axios.post('https://64610008185dd9877e34f663.mockapi.io/cart', obj);
    //?використовується для того, щоб обєкт передати в корзину
    setCartItems((prev)=>[...prev, obj]);
  }

  //?Функція видалення товару з корзини
  const onRemoveItem=(id)=>{
    axios.delete(`https://64610008185dd9877e34f663.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }
  //*----------------------------------------------------------------------------------------------------------------//


  //*----------------------------------------------------------------------------------------------------------------//
  //?Функція для пошуку товарів                                                                                 54-58
  const onChangeShearchInput = (event) =>{
    setSearchValue(event.target.value);
  }
  //*----------------------------------------------------------------------------------------------------------------//


  return (
    <div className="wrapper">
      {/* Використовується для відображення корзини при кліку на неї*/}
      {cartOpened && <Overlay items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={()=>setCartOpened(true)} />

      <Routes>
        <Route path="/test" element={<Test />}/>
        <Route path="/favorites" element={<Favorites />}/>
      </Routes>


      <main className="main">
            <div className="title__wrap">
                <h1 className="title">{searchValue ? `Пошук по запиту "${searchValue}"`: 'Всі кросівки'}</h1>
                <input type="text" placeholder="Пошук.." onChange={onChangeShearchInput} value={searchValue}></input>
                {searchValue && <img className='vidro' src='IMG/ICON/vidro.png' onClick={()=>setSearchValue('')}></img>}
            </div>
            <div className="wrap-for-card">
                {/*цей items використовується для відображення даних з backend рядок 11*/}
                {/*Фільтер використовується, щоб відображати карточки імя яких я пишу в пошуку*/}
                {items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item)=>(
                    <Card
                        /* key={item.title} */
                        ImageURL={item.ImageURL}
                        title={item.title}
                        price={item.price}
                        //при натисканні буде викликатись функцz
                        onPlus={(obj)=>onAddToCard(obj)}
                    />
                ))}
            </div>
        </main>

    </div>
  )
}
export default App;