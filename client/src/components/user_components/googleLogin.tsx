import { useEffect } from "react";
import { loginWithGoogle } from "../../api/userAuth/signUp";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import configKeys from '../../envConfig';
const client_id =
  "911191795022-ltd690s4mdomnhauinctv40t26joismt.apps.googleusercontent.com";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // Load the Google Identity API library
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Identity API
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: client_id,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  const handleGoogleResponse = async (response: any) => {
    console.log(response.credential);
    const res = await loginWithGoogle(response.credential);
    if (res?.data.ok) {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res?.data.isUser));
      notify();
    }
  };

  const notify = async () => {
    toast.success("successfully logged in", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div id="signInDiv"></div>
    </>
  );
};

export default GoogleLogin;
