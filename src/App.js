import Header from './components/Header/Header'
import Overlay from './components/Overlay/Overlay'
import Card from './components/Card/Card'
import React from 'react';


function App() {
  //--------------------------------------------------------//
  //Створення масиву для відображення даних з Backend
  const [items, setItems] = React.useState([]);
  //Використовується для відкриття і закриття корзини при натиисканні на неї
  const [cartOpened, setCartOpened] = React.useState(false);
  //Використовується для пошуку по товарах (input)
  const [searchValue, setSearchValue] = React.useState('');
  //--------------------------------------------------------//

  //--------------------------------------------------------//
  //Відображення даних з Backend
  React.useEffect(()=>{
    fetch('https://64610008185dd9877e34f663.mockapi.io/items')
    .then((response) => {return response.json()})
    .then((json) =>{setItems(json)})
  },[])
  //--------------------------------------------------------//

  //--------------------------------------------------------//
  //Додавання елементів в корзину
  const [cartItems, setCartItems] = React.useState([]);
  //Функція додавання товару в корзину
  const onAddToCard=(obj)=>{
    setCartItems([...cartItems, obj])
  }
  //--------------------------------------------------------//

  //--------------------------------------------------------//
  //Функція для пошуку товарів
  const onChangeShearchInput = (event) =>{
    setSearchValue(event.target.value)
  }
  //--------------------------------------------------------//

  return (
    <div className="wrapper">
      {/* Використовується для відображення корзини при кліку на неї*/}
      {cartOpened && <Overlay items={cartItems} onClose={()=>setCartOpened(false)}/>}
      <Header onClickCart={()=>setCartOpened(true)} />
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
                onFavorite={()=>console.log('Закладки')}
                //при натисканні буде викликатись функція
                onPlus={(obj)=>onAddToCard(obj)}
              />
            ))}
          </div>
      </main>
    </div>
  )
}
export default App;