import React from "react";
import Card from "../components/Card/Card"
import AppContext from '../Context';

function Favorites({onAddToFavorite}){ 

    const {favorites} = React.useContext(AppContext) 

    return(
        <main className="main">
            <h1>Мої закладки</h1>
            <div className="wrap-for-card">
                {favorites.map((item, index)=>(
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