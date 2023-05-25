import React from 'react';
import {Route, Routes} from "react-router";
import axios from 'axios';
import Header from './components/Header/Header'
import Overlay from './components/Overlay/Overlay'

import Home from './pages/Home';
import Favorites from './pages/Favorites';




function App() {
  //*----------------------------------------------------------------------------------------------------------------//
  //?Створення масиву для відображення даних з Backend                                                          21-28
  const [items, setItems] = React.useState([]);

  //?Використовується для відкриття і закриття корзини при натиисканні на неї                                      52
  const [cartOpened, setCartOpened] = React.useState(false);

  //?Використовується для пошуку по товарах (input)                                                             55-59
  const [searchValue, setSearchValue] = React.useState('');

  //?Додавання елементів в корзину і на бекенд
  const [cartItems, setCartItems] = React.useState([]);

  //?Додавання товару в обране\
  //!------------------------------------------------------------------------
  //!------------------------------------------------------------------------
  const [favorites, setFavorites] = React.useState([]);


  const onAddToFavorite=(obj)=>{
    console.log(obj);
/*     if(favorites.find(obj=>obj.id===obj.id)){
      axios.delete(`https://64610008185dd9877e34f663.mockapi.io/cart/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } else{
      axios.post('https://64610008185dd9877e34f663.mockapi.io/cart', obj);
      setFavorites((prev)=>[...prev, obj]);
    } */
      
  }
  //!------------------------------------------------------------------------
  //!------------------------------------------------------------------------
  //*----------------------------------------------------------------------------------------------------------------//


  //*----------------------------------------------------------------------------------------------------------------//
  //?Відображення даних з Backend
  React.useEffect(()=>{
    //?запит на отримання карточок з товарами 
      axios.get('https://64610008185dd9877e34f663.mockapi.io/items').then(res=>{
      setItems(res.data);
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
        <Route path="/" element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCard={onAddToCard}
              //!---------------------------------
              onAddToFavorite={onAddToFavorite}
              //!---------------------------------
              onChangeShearchInput={onChangeShearchInput}
            />
          }
        />
      </Routes>
      <Routes>
      //!---------------------------------
          <Route path="/Favorites" element={
            <Favorites
              items={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        />
        //!---------------------------------
      </Routes>


    </div>
  )
}
export default App;