import { act, use, useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

const initialCart = [];

const sanitizeQty = (val) => {
  const n = Math.floor(Number(val));
  return Number.isFinite(n) && n >= 1 ? n : 1;
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action;
      const exists = state.some((p) => p.name === product.name);
      if (exists) return state;
      return [...state, { ...product, quantity: 1 }];
    }
    case "REMOVE_ITEM": {
      const { name } = action;
      return state.filter((p) => p.name !== name);
    }
    case "UPDATE_ITEM": {
      const { name, quantity } = action;
      const nextQty = sanitizeQty(quantity);
      return state.map((p) => {
        return p.name === name ? { ...p, quantity: nextQty } : p;
      });
    }
    default:
      return state;
  }
}

function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart);

  const isInCart = (name) => cart.some((p) => p.name === name);

  const addToCart = (product) => {
    if (isInCart(product.name)) {
      const current = cart.find((p) => p.name === product.name);
      dispatchCart({
        type: "UPDATE_ITEM",
        name: product.name,
        quantity: current.quantity + 1,
      });
    } else {
      dispatchCart({ type: "ADD_ITEM", product });
    }
  };

  const removeFromCart = (name) => {
    dispatchCart({ type: "REMOVE_ITEM", name });
  };

  const handleQtyChange = (name, val) => {
    dispatchCart({ type: "UPDATE_ITEM", name, quantity: val });
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

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
      {cart.length > 0 && (
        <>
          <h3>Carrello</h3>
          <ul>
            {cart.map((item) => {
              return (
                <li style={{ marginBottom: 8 }} key={item.name}>
                  {item.name} - {item.price.toFixed(2)} - Quantità:{" "}
                  <input style={{ padding: 5 }} type="number" min={1} step={1} inputMode="numeric" value={item.quantity} onChange={(e) => handleQtyChange(item.name, e.target.value)} />
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
