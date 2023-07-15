import ProfileDetail from "../../../components/user_components/profile_components/profileDetail"
import ProfileActivities from "../../../components/user_components/profile_components/userActivities"

const ProfilePage : React.FC = ()=>{
    return (
        <>
        <div className="flex flex-wrap px-7 md:px-20 lg:px-32 xlg:px-44 mt-12">
            <div className="w-full md:w-4/12">
                <ProfileDetail />
            </div>
            <div className=" w-full md:w-8/12">
                <ProfileActivities />
            </div>
        </div>
        </>
    )
}


export default ProfilePage