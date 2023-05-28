import React from 'react';
import {Route, Routes} from "react-router";
import axios from 'axios';
import Header from './components/Header/Header'
import Overlay from './components/Overlay/Overlay'
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  //*=================================================================================================================
  //?Створення масиву для відображення даних з Backend                                                              74
  const [items, setItems] = React.useState([]);
  React.useEffect(()=>{
    //?запит на отримання карточок з товарами 
      axios.get('https://64610008185dd9877e34f663.mockapi.io/items').then(res=>{
      setItems(res.data);
    })
  },[])
  //*=================================================================================================================
  
  //*=================================================================================================================
  //?Використовується для відкриття і закриття корзини при натиисканні на неї                                       68
  const [cartOpened, setCartOpened] = React.useState(false);
  //*=================================================================================================================
  
  //*=================================================================================================================
  //?Використовується для пошуку по товарах (input)                                                                 73
  const [searchValue, setSearchValue] = React.useState('');
  //?Функція для пошуку товарів                                                                                     79
  const onChangeShearchInput = (event) =>{
    setSearchValue(event.target.value);
  }
  //*=================================================================================================================

  //*=================================================================================================================
//!-------------------------------------------------------------------------------------------------------------------
  //?Додавання елементів в корзину і на бекенд
  const [cartItems, setCartItems] = React.useState([]);
  //?Функція додавання товару в корзину
    const onAddToCard=(obj)=>{
      try {
        if(cartItems.find((item)=>Number(item.id) === Number(obj.id))){
          axios.delete('https://64610008185dd9877e34f663.mockapi.io/cart/', obj.id)           //якщо в корзині є такий товар, то видали
          setCartItems((prev)=>prev.filter(item=>Number(item.id)!==Number(obj.id)));
        } else{                                                                               //якщо його немає то відправ запит на бекенд і збережи його там
          axios.post('https://64610008185dd9877e34f663.mockapi.io/cart/', obj)                //створи товар в бекенді
          setCartItems((prev)=>[...prev, obj]);                                               // створи товар в корзині
        }
      } catch (error) {
        alert('Помилка')
      }
    }
//!-------------------------------------------------------------------------------------------------------------------
  //*=================================================================================================================

  //*=================================================================================================================
  //?Додавання елементів в обране в бекенд
  const [favorites, setFavorites] = React.useState([]);
  const onAddToFavorite=async(obj)=>{
    //Якщо в favObj в масиві favorites id такий самий як в обєкті на який я натиснув то відправляю запит на идалення
    try {
      if(favorites.find((favObj)=>favObj.id === obj.id)){
        axios.delete(`https://64610008185dd9877e34f663.mockapi.io/cart/${obj.id}`)//запит на видалення
      } else {
        const {data} = await axios.post('https://64610008185dd9877e34f663.mockapi.io/cart', obj);//дочекайся відповіді і пезультат запиши в змінну data
        setFavorites((prev)=>[...prev, data]);
      }
    } catch (error) {
      alert('ERROR')
    }
  }
  //*=================================================================================================================

  //?Функція видалення товару з корзини
  const onRemoveItem=(id)=>{
    axios.delete(`https://64610008185dd9877e34f663.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  return (
    <div className="wrapper">
      {/* Використовується для відображення корзини при кліку на неї*/}
      {cartOpened && <Overlay items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={()=>setCartOpened(true)} />
      <Routes>
        <Route path="/" element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCard={onAddToCard}
              onAddToFavorite={onAddToFavorite}
              onChangeShearchInput={onChangeShearchInput}
            />
          }
        />
      </Routes>
      <Routes>
          <Route path="/Favorites" element={
            <Favorites
              items={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
      </Routes>
    </div>
  )
}
export default App;