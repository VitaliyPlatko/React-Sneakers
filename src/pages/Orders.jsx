import React from "react";
import Card from "../components/Card/Card";

function Orders(){ 
    return(
        <main className="main">
            <h1>Мої замовлення</h1>
            <div className="wrap-for-card">
                {[].map((item, index)=>(
                    <Card/>
                ))}
            </div>
        </main>
    )
}

export default Orders