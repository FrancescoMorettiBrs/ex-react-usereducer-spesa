import { useState } from "react";

function App() {
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    setAddedProducts((prev) => {
      const alreadyInCart = prev.some((p) => p.name === product.name);
      return alreadyInCart ? updateProductQuantity(prev, product.name) : [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateProductQuantity = (arr, name) => {
    return arr.map((item) => {
      return item.name === name ? { ...item, quantity: item.quantity + 1 } : item;
    });
  };

  const removeFromCart = (name) => {
    setAddedProducts((prev) => prev.filter((p) => p.name !== name));
  };

  const total = addedProducts.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

  const isInCart = (name) => addedProducts.some((p) => p.name === name);

  return (
    <>
      <h2>Questi sono i miei prodotti</h2>
      <ul>
        {products.map((currProd) => {
          return (
            <>
              <li style={{ margin: 8 }} key={currProd.name}>
                {currProd.name} - {currProd.price.toFixed(2)}€
                <button className="btn" style={{ marginLeft: 10 }} onClick={() => addToCart(currProd)} disabled={isInCart(currProd.name)}>
                  {isInCart(currProd.name) ? "Già nel carrello" : "Aggiungi al carrello"}
                </button>
              </li>
            </>
          );
        })}
      </ul>
      {addedProducts.length > 0 && (
        <>
          <h3>Carrello</h3>
          <ul>
            {addedProducts.map((item) => {
              return (
                <li style={{ marginBottom: 8 }} key={item.name}>
                  {item.name} - {item.price.toFixed(2)} - Quantità: {item.quantity}
                  <button className="btn" onClick={() => setAddedProducts((prev) => updateProductQuantity(prev, item.name))} style={{ marginLeft: 5 }}>
                    +
                  </button>
                  <button className="btn" onClick={() => removeFromCart(item.name)} style={{ marginLeft: 5 }}>
                    Rimuovi
                  </button>
                </li>
              );
            })}
          </ul>
          <p>
            <strong>Totale:</strong>
            {total.toFixed(2)}€
          </p>
        </>
      )}
    </>
  );
}

export default App;
