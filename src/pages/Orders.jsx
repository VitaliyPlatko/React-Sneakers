import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../Context";

function Orders(){ 
    const {orders, onAddToFavorite} = React.useContext(AppContext)

    return(
        <main className="main">
            <h1>Мої замовлення</h1>
            <div className="wrap-for-card">
                {orders.map((item, index)=>(
                    <Card
                        key={index}
                        onFavorite={(obj)=>onAddToFavorite(obj)}
                        {...item}
                    />
                ))}
            </div>
        </main>
    )
}

export default Orders