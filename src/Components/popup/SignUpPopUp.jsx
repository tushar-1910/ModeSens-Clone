import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useAlert } from "react-alert";
import CustomPopup from "./CustomPopUp";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import pic from "../signinImage/singin-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getUserError, getUserLoading } from "../../redux/login/action";
import { CartCountContext } from "../../context/SetCart";

const SignupPopup = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [FormData, setFormData] = useState({});
  const [formData, setformData] = useState({});
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { user, isLoading, isError } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const alert = useAlert();
  const {getData} = useContext(CartCountContext);


  const handleChange = (e) => {
    const inputName = e.target.name;

    setFormData({
      ...FormData,
      [inputName]: e.target.value,
    });
  };
  // console.log(FormData)
  const post = async () => {
    try {

      dispatch(getUserLoading());
      let res = await fetch(`https://modesens-backend.vercel.app/users`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: FormData.email,
            password: FormData.password,
            cart:[]
          })
      });
      getUser();
      alert.success("Registration successful! please login");
      setFormData({});
      setLogin(true);



    } catch (error) {
      console.log(error)
    }
    // console.log(arr);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post();
    
  };
  const getUser = async () => {
    try {

      dispatch(getUserLoading());
      let res = await fetch(`https://modesens-backend.vercel.app/users`);
      let data = await res.json();
      dispatch(getUserData(data))

    } catch (error) {
      dispatch(getUserError());
    }

  };

  React.useEffect(() => {
    getUser();
  }, [dispatch])

  //console.log("user", user);
  // console.log("form", formData);

  const handleLogin = (e) => {
    e.preventDefault();
    // getData();
    let flag = true;
    // console.log(user);
    // console.log(formData);
    user.forEach(user => {
      if (
        user.email === formData.email &&
        user.password === formData.password
      ) {
        localStorage.setItem("modesensUserId", user.id);
        getData(user.id);
        alert.success("login success");
        setformData({});
        navigate("/");
        setIsAuth(true);
        flag = false;
        setVisibility(false);
      }
      else if (user.email === formData.email && formData.password !== user.password) {
        alert.error("Wrong password!");
        flag = false;
      }
    });
    if(flag){
      alert.error("User Not Found, Please Sign in First");
    }
      // navigator("/");
    // setVisibility(false);
  }


  const handleChangeLogin = (e) => {
    let inputName = e.target.name;
    setformData({ ...formData, [inputName]: e.target.value });
  };
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <>
      {isAuth ? (
        <div>
          <img
            src="https://cdn.modesens.com/user?w=400"
            alt="jjj"
          />
        </div>
      ) : (
        <div style={{ cursor: "pointer" }}>
          <img
            onClick={() => setVisibility(!visibility)}
            className={style.signup_btn}
            src="https://cdn.modesens.com/static/img/20200612account_b2.svg"
            alt="k"
          />
        </div>
      )}

      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        className={style.main}
      >
        <div className={style.containerLogin}>
          <div className={style.left}>
            <img
              src={pic}
              alt=""
            />
          </div>
          {login ? (
            <div className={style.rightWrapper}>
              <div className={style.logright}>
                <h2 className={style.logrighth2}>Log in to your account</h2>
                <p className={style.logrightp}>Compare across 500+ stores</p>
                <p className={style.logadjust}>to find the best price.</p>
                <form className={style.formData} onSubmit={handleLogin}>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className={style.email}
                    value={formData.email}
                    onChange={handleChangeLogin}
                    required
                  />
                  <input
                    type="password"
                    id="pass"
                    name="password"
                    placeholder="Password"
                    className={style.password}
                    value={formData.password}
                    onChange={handleChangeLogin}
                    required
                  />
                  <br />

                  <input
                    className={style.login}
                    type="submit"
                    value={"LOG IN"}
                  />
                </form>
                <div className={style.orDiv}>
                  <div className={style.firsthr}>
                    <hr />
                  </div>
                  <div className={style.or}>or</div>
                  <div className={style.secondhr}>
                    <hr />
                  </div>
                </div>
                <div className={style.logos}>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617google.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617facebook.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617apple.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617wechat.svg"
                      alt=""
                    />
                  </div>
                </div>
                <a
                  href="#"
                  className={style.signinLogin}
                  onClick={() => setLogin(false)}
                >
                  Don't have an account? Please Sign up
                </a>
              </div>
            </div>
          ) : (
            <div className={style.rightWrapper}>
              <div className={style.right}>
                <h2>Create an account</h2>
                <p>Compare across 500+ stores</p>
                <p className={style.adjust}>to find the best price.</p>
                <form className={style.formData} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    name="email"
                    className={style.email}
                    value={FormData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    id="pass"
                    placeholder="Password"
                    className={style.password}
                    name="password"
                    value={FormData.password}
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <label className={style.radioBtn} htmlFor="radioA">
                    <input type="radio" name="radio1" value="A" required />{" "}
                    &nbsp; Subscribe to personalized sale updates and offers
                  </label>
                  <br />
                  <input
                    className={style.login}
                    type="submit"
                    value={"Sign Up"}
                  />
                </form>
                <div className={style.orDiv}>
                  <div className={style.firsthr}>
                    <hr />
                  </div>
                  <div className={style.or}>or</div>
                  <div className={style.secondhr}>
                    <hr />
                  </div>
                </div>
                <div className={style.logos}>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617google.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617facebook.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617apple.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://modesens.com/static/img/login-icon/20210617wechat.svg"
                      alt=""
                    />
                  </div>
                </div>
                <a
                  href="#"
                  className={style.signinLogin}
                  onClick={() => setLogin(true)}
                >
                  Already have an account? Please sign in.
                </a>
                <div className={style.signinfooter}>
                  By creating an account, I agree to the{" "}
                  <a href="##">Terms Of Use </a>
                  and the <a href="##">Privacy Policy</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </CustomPopup>
    </>
  );
};

export default SignupPopup;
