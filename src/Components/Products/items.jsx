import styled, { css, withTheme } from "styled-components";
import { useEffect, useState } from "react";
// import styles from "../Beauty/Pagination.module.css";
import styles from './page.module.css';
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${(props) =>
    props.grid2 === true &&
    css`
      grid-template-columns: 400px 400px;
      gap: 40px;
    `};
  ${(props) =>
    props.grid3 === true &&
    css`
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    `}
  gap: 4px;
`;
const Button = styled.button`
  border: 1px solid black;
  margin: 0 auto;
  width: 85%;
  position: absolute;
  font-weight: bold;
  top: 56%;
  bottom: 34%;
  display: none;
  background: rgba(255, 255, 255, 0.6) none repeat scroll 0% 0% / auto
    padding-box border-box;
  z-index: 99;
`;
const Container = styled.div`
  border: 1px solid #f5f5f5;
  position: relative;
  padding: 0 20px;
  overflow: hidden;
  height: 370px;
  &:hover ${Button} {
    display: block;
  }
`;

const SlideItem = styled.img`
  height: 100%;
  width: 90%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: auto;
`;
const HeartDIv = styled.div`
  position: absolute;
  left: 88%;
  bottom: 93%;
  color:black;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  text-align: center;
  margin-top: -50px;
  
  

  & span {
    font-size: 12px;
    color: gray;
  }
  & h6 {
    font-size: 13px;
    font-weight: bold;
    margin: 0;
  }
`;
const Header = styled.h1`
  font-size: 24px;
  font-family: "Open Sans", sans-serif;
  color:black;
  margin-right:150px;
  
`;
const SubHead = styled.p`
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  text-align: left;
  color:black;
`;
const HeartImg = styled.img``;

const Items = ({ props }) => {
  const name = { props }
  const category = name.props;
  // console.log(category)
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [grid2, setgrid2] = useState(false);
  const [grid3, setgrid3] = useState(false);

  useEffect(() => {
    getdata();
    // console.log("data recieved")
    // console.log(page)
  }, [page, grid2]);
  //_page=${page}&_limit=16
  async function getdata() {
    let datas = await fetch(
      `https://modesens-backend.vercel.app/${category}?_page=${page}`
    );

    let data = await datas.json();
    // console.log(data)
    setItems(data);
  }
  const handleUser = (e) => {
    localStorage.setItem("IndData", JSON.stringify(e));
  };
  function handleSort(e) {
    // console.log("hello")
    // console.log(e.target.value)
    if (e.target.value === "highest_price") {
      // console.log(items[0].price)
      items.sort((a, b) => b.price - a.price);
      setItems([...items]);
      // console.log("hello")
    } else if (e.target.value === "lowest_price") {
      // console.log(items[0].price)
      items.sort((a, b) => a.price - b.price);
      setItems([...items]);
      // console.log("hello")
    }
  }
  return (
    <div>
      <div>
        <Header>{category == 'mens' ? 'Men Collection'
          : category == 'womens' ? 'Womens Collection'
            : 'Beauty Collection'}</Header>
        <SubHead>
          Shop Awesome attire with price comparison across 500+ stores in one
          place. Discover the latest brands in men's Collection.
        </SubHead>
      </div>
      <div className={styles.pagdiv} style={{ marginTop: "-150px" }}>
        <div className={styles.paginationWrap}>
          <div className={styles.pagination} style={{ color: 'black' }}>
            <span onClick={() => setPage(1)}>1</span>
            <span onClick={() => setPage(2)}>2</span>
            <span onClick={() => setPage(3)}>3</span>
            <span onClick={() => setPage(4)}>4</span>
            <div className={styles.paginationDot}>
              <>...</>
            </div>

            <div className={styles.imgTag}>
              <img
                src="https://img.icons8.com/material-outlined/14/000000/more-than.png"
                onClick={() => setPage(page + 1)}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.sortdiv}>
          <img
            className={styles.viewsort}
            onClick={() => {
              setgrid2(true);
              setgrid3(false);
              // console.log(grid2)
            }}
            src="https://cdn.modesens.com/static/img/20210908column2.svg"
            alt=""
          />
          <img
            className={styles.viewsort}
            onClick={() => {
              setgrid3(true);
              setgrid2(false);
              // console.log(grid2)
            }}
            src="https://cdn.modesens.com/static/img/20210908column3.svg"
            alt=""
          />
          <img
            className={styles.viewsort}
            onClick={() => {
              setgrid3(false);
              setgrid2(false);
              // console.log(grid2)
            }}
            src="https://cdn.modesens.com/static/img/20210908column4_active.svg"
            alt=""
          />
          <div className="select_back">
            <select className="options" name="" id="" onChange={handleSort}>
              <option value="lowest_price">Lowest Price</option>
              <option value="highest_price">Highest Price</option>
              <option value="best_sellers">Best Sellers</option>
              <option value="new_arrival">New Arrivals</option>
              <option value="most_liked">Most Liked</option>
              <option value="new_sales">New Sales</option>
              <option value="largest_discount">Largest Discount Amount</option>
              <option value="largest_discount_per">
                Largest Discount Percentage
              </option>
            </select>
          </div>
        </div>
      </div>
      <Wrapper grid2={grid2} grid3={grid3}>
        {items.map((e) =>
        (
          <Container
            onClick={() => {
              handleUser(e);
            }}
            key={e.id}
          >

            <Link to={`/${category}/${e.id}`} style={{ textDecoration: "none" }}>
              <HeartDIv>
                <HeartImg
                  src="https://cdn.modesens.com/static/img/20210601heart.svg"
                  alt=""
                />
              </HeartDIv>
              <div
                style={{
                  display: "flex",
                  border: "none",
                  justifyContent: "center",
                  padding: "20px 8px",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: "220px",
                    overflow: "hidden",
                  }}
                >
                  <SlideItem src={e.image_url} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", color: "black" }}>
                <Button>Quick View</Button>
              </div>
              <TextDiv>
                <div>
                  <div style={{ paddingTop: "20px",marginTop:"10px" }}>
                    <h5
                      style={{
                        color: "black",
                        fontSize: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                        // marginTop:"0px",


                      }}
                    >
                      {e.brand}
                    </h5>
                  </div>
                  <div style={{ paddingBottom: "35px",marginBottom:"10px" }}>
                    <p
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        color: "gray",
                        // lineHeight:"10px",
                      }}
                    >
                      {e.title}
                    </p>


                    <h6
                      style={{
                        color: "black",
                      }}
                    >
                      ₹{e.price}-₹{e.offprice}
                    </h6>
                    <span style={{ color: "gray" }}>
                      {Math.floor(Math.random() * (20 - 5 + 1)) + 5}-store
                    </span>
                  </div>
                </div>
              </TextDiv>
            </Link>



          </Container>
        )
        )}
      </Wrapper>
    </div>
  );
};

export default Items;
