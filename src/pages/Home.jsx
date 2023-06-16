import Card from '../components/Card/Card';

function Home({items, searchValue, setSearchValue, onAddToCard, onAddToFavorite, onChangeShearchInput, cartItems}){ 
    return(
        <main className="main">
            <div className="title__wrap">
                <h1 className="title">{searchValue ? `Пошук по запиту "${searchValue}"`: 'Всі кросівки'}</h1>
                <input type="text" placeholder="Пошук.." onChange={onChangeShearchInput} value={searchValue}></input>
                {searchValue && <img className='vidro' src='IMG/ICON/vidro.png' onClick={()=>setSearchValue('')}></img>}
            </div>
            <div className="wrap-for-card">
                {/*цей items використовується для відображення даних з backend рядок 11*/}
                {/*Фільтер використовується, щоб відображати карточки імя яких я пишу в пошуку*/}
                {items.filter(item=>item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index)=>(
                    <Card
                        id={item.id}
                        key={index}
                        ImageURL={item.ImageURL}
                        title={item.title}
                        price={item.price}
                        onFavorite={(obj)=>onAddToFavorite(obj)}
                        onPlus={(obj)=>onAddToCard(obj)}
                        added={cartItems.some(obj=>Number(obj.id)===Number(item.id))}
                    />
                ))}
            </div>
        </main>
    )
}

export default Home