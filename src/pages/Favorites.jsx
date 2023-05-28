import Card from "../components/Card/Card"

function Favorites({items, onAddToFavorite}){ 
    return(
        <main className="main">
            <h1>Мої закладки</h1>
            <div className="wrap-for-card">
                {items.map((item, index)=>(
                    <Card
                        key={index}
                        onFavorite={onAddToFavorite}
                        favorited={true}
                        {...item}
                    />
                ))}
            </div>
        </main>
    )
}

export default Favorites