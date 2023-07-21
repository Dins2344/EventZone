import { useNavigate } from "react-router-dom";
import BookingDetails from "../../../components/user_components/profile_components/bookingDetails";
import { useEffect, useState } from "react";

const BookingDetailsPage: React.FC = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setToken(token);
    if (!token) {
      navigate("/");
    }
  }, []);

  return <>{token && <BookingDetails />}</>;
};

export default BookingDetailsPage;
