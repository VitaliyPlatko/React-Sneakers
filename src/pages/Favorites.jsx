import Card from "../components/Card/Card"

function Favorites({items, onAddToFavorite}){ 
    return(
        <main className="main">
            <h1>Мої закладки</h1>
            <div className="wrap-for-card">
                Тут будуть мої закладки
                {items.map((item, index)=>(
                    <Card
                        key={index}
                        ImageURL={item.ImageURL}
                        title={item.title}
                        price={item.price}
                        onFavorite={onAddToFavorite}
                        favorited={true}
                    />
                ))}
            </div>
        </main>
    )
}

export default Favorites