import React from "react";

export const CartCountContext = React.createContext();

function CartCountContextProvider({ children }) {
    const [cartCount, setCartCount] = React.useState(0);
    const userId = localStorage.getItem("modesensUserId") || null;
    const getData = async (userId) => {
        try {
          let data = await fetch(`http://localhost:8080/users/${userId}`);
          let result = await data.json();
          setCartCount(result.cart.length);
        } catch (error) {
          console.log(error);
        }
      };
    
      React.useEffect(() => {
        if(userId) {
        getData(userId);
        }
      },[])
    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount,getData }}>
            {children}
        </CartCountContext.Provider>
    );
}

export default CartCountContextProvider;
