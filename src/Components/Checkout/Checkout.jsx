import React, { useContext } from 'react'
import AddressForm from './AddressForm/AddressForm'
import ShoppingBag from './ShoppingBag/ShoppingBag'
import Summary from './Summary/Summary';
import { Link } from 'react-router-dom';
import "./Checkout.css"
import { useDispatch, useSelector } from 'react-redux';
import { CartCountContext } from '../../context/SetCart';

function Checkout() {
  const [clickedOnCheckout, setClickedOnCheckout] = React.useState(false);
  const [clickedOnPaymentMethod, setClickedOnPaymentMethod] = React.useState(false);
  const userId = localStorage.getItem('modesensUserId') || null;
  const [cart,setCart] = React.useState([]);
  const dispatch = useDispatch();
  const {setCartCount} = useContext(CartCountContext);
  
  const emptyCart = async () => {
    try {
      let updatedCart = [];
      await fetch(`https://modesens-backend.vercel.app/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart: updatedCart
            })
        });
        getData(userId);

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteItemInCart = async(itemId) => {
    try {
      let allCartData = await fetch(`https://modesens-backend.vercel.app/users/${userId}`);
      let allCartDataJson = await allCartData.json();
      let cart = allCartDataJson.cart;
      // let updatedCart = cart.filter(item => item.id !== itemId);
      let itemindex = cart.findIndex(item => item.id === itemId);
      // console.log(itemindex)
      let updatedCart = cart.filter((item,i) => i !== itemindex);
      // console.log(updatedCart);
      // let updatedCart = cart.splice(itemindex, 1);
      await fetch(`https://modesens-backend.vercel.app/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart: updatedCart
            })
        });
        getData(userId);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async (userId) => {
    try {
      let data = await fetch(`https://modesens-backend.vercel.app/users/${userId}`);
      let result = await data.json();
      setCart(result.cart);
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
    <>
    <div>
        <h1 style={{color:"#1C1C1C", fontWeight:"700!important", fontSize:"1.7rem"}}>MODESENS CONCIERGE</h1>
        {
          !clickedOnCheckout ? <p style={{color:"#1C1C1C", fontWeight:"500", fontSize:"14px", letterSpacing:'.3px'}}>
          <span>Let ModeSens determine which store fulfill your request to get the best price for the product you want</span>
          <br />
          <span>- enjoy a worry free experience with no additional cost to you.</span>    
      </p> : null
        }
        
        {
          cart.length > 0 ? <>{
            clickedOnCheckout ? <AddressForm clickedOnCheckout={ clickedOnCheckout } setClickedOnCheckout = {setClickedOnCheckout} clickedOnPaymentMethod={clickedOnPaymentMethod} setClickedOnPaymentMethod={setClickedOnPaymentMethod} /> : null
          }
          <br />
          <ShoppingBag cart={cart} handleDeleteItemInCart={handleDeleteItemInCart} clickedOnCheckout={clickedOnCheckout} />
          <br />
          <Summary cart={cart} clickedOnCheckout={ clickedOnCheckout } setClickedOnCheckout = {setClickedOnCheckout} clickedOnPaymentMethod={clickedOnPaymentMethod} setClickedOnPaymentMethod={setClickedOnPaymentMethod} emptyCart={emptyCart}/></> : <div className='detailsWhenCartIsEmpty'>
            <div className='cartEmptySpanDiv'>
            <p>YOUR SHOPPING BAG IS EMPTY</p>
            <p>You haven't added any pieces to your bag - yet</p>
            </div>
            <img src="https://cdn.modesens.com/static/img/20190618_nothing.svg" alt="" />
            <div className='detailsWhenCartIsEmptyBtnDiv'>
              <Link to="/Womens"><button className='clickableButton'>SHOP WOMEN</button></Link>
              <Link to="/Mens"><button className='clickableButton'>SHOP MEN</button></Link>
              <Link to="/Beauty"><button className='clickableButton'>SHOP BEAUTY</button></Link>
            </div>
          </div>
        }
    </div>
    </>
  )
}

export default Checkout
