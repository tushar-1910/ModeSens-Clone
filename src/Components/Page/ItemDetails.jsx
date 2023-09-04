import React, { useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "../../redux/CartCount/action";
import { CartCountContext } from "../../context/SetCart";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 50px 0;
  margin: auto;
`;
const WrapperInner = styled.div`
  display: flex;
  flex-direction: row;
`;
// const ProductDetails = styled.div`
//    display : flex;
// `;

const AllImgWrapper = styled.div`
  width: 110px;
  height: 360px;
  overflow: hidden;
`;
const AllImgDiv = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 4px 0;
  width: 100%;
  height: 25%;
  opacity: 0.6;
  transition: all 0.5s ease;
  border: 1px solid gray;
  overflow: hidden;
  &:hover {
    opacity: 1;
    border: none;
  }
  &:hover {
    transition: all 0.5s ease;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
`;
const ProductImgDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 503px;
  height: 270px;
  padding: 10px;
`;
const ProductImg = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 533px;
  height: 270px;
  padding: 10px;
`;
const ProductInnerImg = styled.img`
  height: 100%;
`;

const ProductDiscription = styled.div`
  width: 505px;
  padding: 0 35px;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 19px;
  letter-spacing: 1px;
`;
const Description = styled.div`
  font-size: 15px;
  padding: 10px 0;
  font-weight: 500;
`;
const PriceDiv = styled.div`
  display: flex;
  max-width: 80%;
  justify-content: flex-start;
  margin: 10px 0;
`;
const OffPriceP = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 20px;
  text-decoration: line-through;
`;
const PriceP = styled.div`
  display: inline-block;
  color: #c00000;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
`;
const ModesensDiv = styled.div`
  display: flex;
`;
const ModesensInnerDiv = styled.div`
  width: 50%;
`;
const Button = styled.button`
  margin-top: 42px;
  background-color: ${(props) => (props.bg ? props.bg : "white")};
  color: ${(props) => (props.color ? props.color : "black")};
  width: 45%;
  height: 40px;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-right: 5%;
`;
const ModesensInnerDivTitle = styled.h2`
  margin: 0;
  padding: 0;
`;
const Select = styled.select`
  border: none;
  font-size: 16px;
`;

const ItemDetails = () => {
  let state = useSelector((state) => state);
  // console.log("State", state);
  let dispatch = useDispatch();
  const userId = localStorage.getItem("modesensUserId") || null;

  let categorie = window.location.pathname;

  const [productData, setProductData] = React.useState({});
  // let {productId} = useParams()
  // console.log("categorie", categorie);
  const {getData} = useContext(CartCountContext);
  // productId = "62aa267f9854adea94d64c50"

  React.useEffect(() => {
    fetch(`https://modesens-backend.vercel.app${categorie}`)
      .then((res) => res.json())
      .then((res) => {setProductData(res)});
    // console.log("productData", productData);
  }, []);

  let addToBag = (productData) => {
    
    let payload = productData;
    fetch(`https://modesens-backend.vercel.app/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.cart)
        fetch(`https://modesens-backend.vercel.app/users/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({
            cart: [...res.cart, payload],
          }),
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => res.json())
        .then(getData(userId));
      });
  };

  // brand: "ZIMMERAMANN"
  // category: "womens"
  // createdAt: "2022-05-05T08:10:18.415Z"
  // id: "62aa267f9854adea94d64c50"
  // image_url: ['https://cdn-images.farfetch-contents.com/17/07/49/44/17074944_37145276_1000.jpg']
  // offprice: 240
  // price: 125
  // title: "little kid and kids the simpsons"
  // updatedAt: "2022-05-05T08:10:18.415Z"
  // let discountPrice =
  return (
    <>
      <Container>
        <Wrapper>
          <WrapperInner>
            <AllImgWrapper>
              <AllImgDiv>
                <img src={productData.image_url} alt="" />
              </AllImgDiv>

              <AllImgDiv>
                <img src={productData.image_url} alt="" />
              </AllImgDiv>
              <AllImgDiv>
                <img src={productData.image_url} alt="" />
              </AllImgDiv>
            </AllImgWrapper>
            <ProductImgDiv>
              <ProductImg>
                <ProductInnerImg src={productData.image_url} alt="" />
              </ProductImg>
            </ProductImgDiv>
            <ProductDiscription>
              <Title>{productData.brand}</Title>
              <Description>{productData.title}</Description>
              <PriceDiv>
                <OffPriceP> Rs : {productData.offprice}</OffPriceP>{" "}
                <PriceP>
                  Rs : {productData.price} (
                  {Math.floor(
                    (100 / productData.offprice) *
                      (productData.offprice - productData.price)
                  )}{" "}
                  %) Off
                </PriceP>
              </PriceDiv>

              {/* button */}
              <Button>
                <Select>
                  <option>SELECT SIZE</option>
                  <option>S</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                  <option>XXXL</option>
                </Select>
              </Button>
              <Button
                bg="black"
                color="white"
                onClick={() => addToBag(productData)}
              >
                ADD TO BAG
              </Button>
            </ProductDiscription>
          </WrapperInner>
          <ModesensDiv>
            <ModesensInnerDiv>
              <ModesensInnerDivTitle>
                Shop With ModeSens Concierge
              </ModesensInnerDivTitle>
              <p>
                We will fulfill your order by finding the best price available
                from our partner stores, applying any applicable promotions and
                providing assistance on tracking, returns or anything else you
                may need.
              </p>
            </ModesensInnerDiv>
            <ModesensInnerDiv>
              {/* <Button><Select>
                        <option>SELECT SIZE</option>
                          <option>S</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>XXL</option>
                          <option>XXXL</option>
                          
                          </Select></Button>
                        <Button bg="black" color="white" onClick={() => addToBag(productData)} >ADD TO BAG</Button> */}
            </ModesensInnerDiv>
          </ModesensDiv>
        </Wrapper>
      </Container>
    </>
  );
};
export default ItemDetails;
