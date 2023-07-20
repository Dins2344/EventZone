import {useState} from 'react'
import ContactInfo from '../../../components/user_components/profile_components/contactInfo';

const EditProfile: React.FC = () => {
    const [menu,setMenu] = useState('')
    const handleMenu = (option:string)=>{
        setMenu(option)
    }
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="w-full  bg-blue-gray-50 px-5 md:px-10 lg:px-40">
          <div className="flex h-10 md:h-20 w-full items-center justify-between">
            <h4 onClick={()=>handleMenu('contactInfo')} className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white">
              Contact info
            </h4>
            <h4 onClick={()=>handleMenu('changeEmail')} className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white">
              Change email
            </h4>
            <h4 onClick={()=>handleMenu('changePassword')} className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white">
              Change password
            </h4>

            <h4 onClick={()=>handleMenu('closeAcc')} className="text-sm md:text-lg lg:text-xl md:font-bold dark:text-white">
              Close account
            </h4>
          </div>
        </div>
        <div>
            <ContactInfo />
        </div>

      </div>
    </>
  );
};

export default EditProfile;

