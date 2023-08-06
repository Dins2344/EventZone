import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileDetail: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full h-full px-2 bg-gradient-to-b from-blue-gray-300 pt-2">
        <div className="flex flex-wrap ">
          <img
            className="h-20 w-20 rounded-full"
            src={user.profileImage}
            alt="https://img.freepik.com/free-icon/user_318-159711.jpg"
          />
          <div className="flex flex-col ml-4 justify-center">
            <div className="flex">
              <h3 className="text-2xl">
                {user.firstName} {user.lastName}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-5 hover:cursor-pointer"
                onClick={()=>navigate('/user/edit-profile')}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <p>likes { user.likedEvents?.length} events</p> 
            <p>following {user.following?.length} organizations</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
