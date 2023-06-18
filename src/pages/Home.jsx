import React from 'react';
import Card from '../components/Card/Card';

function Home({items, searchValue, setSearchValue, onAddToCard, onAddToFavorite, onChangeShearchInput, isLoading}){ 

    const renderItems = () =>{
        const filteredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index)=>(
            <Card
                id={item.id}
                key={index}
                ImageURL={item.ImageURL}
                title={item.title}
                price={item.price}
                onFavorite={(obj)=>onAddToFavorite(obj)}
                onPlus={(obj)=>onAddToCard(obj)}
                loading={isLoading}
            />
        ))
    };
    return(
        <main className="main">
            <div className="title__wrap">
                <h1 className="title">{searchValue ? `Пошук по запиту "${searchValue}"`: 'Всі кросівки'}</h1>
                <input type="text" placeholder="Пошук.." onChange={onChangeShearchInput} value={searchValue}></input>
                {searchValue && <img className='vidro' src='IMG/ICON/vidro.png' onClick={()=>setSearchValue('')}></img>}
            </div>
            <div className="wrap-for-card">{renderItems()}</div>
        </main>
    )
}

export default Home