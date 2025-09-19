import { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];
  return (
    <>
      <h2>Questi sono i miei prodotti</h2>
      {products.map((currProd, i) => {
        return (
          <p key={currProd.name}>
            {currProd.name} - {currProd.price}€
          </p>
        );
      })}
    </>
  );
}

export default App;
