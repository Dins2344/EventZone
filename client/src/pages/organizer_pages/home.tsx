import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { getEventDetails, getUsersOrganizations } from "../../api/organizer/organizer";
import { OrganizationInterface } from "../../types/organizerInterface";
import { getOrganizationDetails } from "../../api/organizer/organizer";

const OrganizationHome = () => {
  const userDetails = useSelector(selectUser);

  useEffect(() => {
    console.log(userDetails);
  });
  return (
    <>
      <div className="w-full px-3">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hello,{userDetails && userDetails?.user.firstName}
        </h1>
        <OrganizationDetails />
        <NextEvent />
      </div>
    </>
  );
};

export default OrganizationHome;

const OrganizationDetails = () => {
    const[organizations,setOrganizations] = useState<OrganizationInterface[]>()
    const[selectedOrganization,setSelectedOrganization]=useState('')
    const [organizationDetails,setOrganizationDetails]=useState<OrganizationInterface>()
    const [events,setEvents]=useState()

    const fetchOrganizations =async ()=>{
        const data = await getUsersOrganizations()
        setOrganizations(data.data.data)
    }

    const fetchOrganization = async()=>{
      const data:OrganizationInterface =  organizations?.filter((item)=>{
        if(item._id == selectedOrganization){
            return item
        }
      })
      console.log(data)
      setOrganizationDetails(data)
    }

    const fetchEvents = async()=>{
        const data = await getEventDetails(organizationDetails._id)
        setEvents(data.data.data)

    }
    
    useEffect(()=>{
        fetchOrganization()
    },[selectedOrganization])

    useEffect(()=>{
        fetchOrganizations()
        fetchEvents()
    },[])
  return (
    <>
      <div className="flex border p-3 rounded-md mb-8">
        <div className="flex md:w-2/3 lg:w-1/4">
          <div className="w-20 h-20 mr-3">
            <img
              className="rounded-full "
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="image description"
            />
          </div>
          <div className="flex flex-col md:ml-3">
            <h6 className="inline-flex mb-3 text-lg font-bold dark:text-white">
              org Name
            </h6>
            <p className="mb-1 text-gray-500 dark:text-gray-400">
              Total Events
            </p>
            <p className=" text-gray-500 dark:text-gray-400">Total Followers</p>
          </div>
        </div>
        <div className="ml-2">
          <select
          onChange={(e)=>{
            setSelectedOrganization(e.target.value)
          }}
            id="small"
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Switch organization</option>
            {organizations && organizations.map((item)=>{
                return (
                    <option  value={item._id}>{item.orgName}</option>
                )
            })}
          </select>
        </div>
      </div>
    </>
  );
};

const NextEvent = () => {
  return (
    <>
      <div className="flex flex-col border p-3 rounded-md ">
        <h2 className="text-4xl font-bold dark:text-white">Your next event</h2>
        <Link className="mb-3 text-blue-600" to={"/organization/events"}>Go to events</Link>
        <div className="flex  flex-wrap  h-auto p-2 bg-blue-gray-50 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <p>Date</p>
            <p>DateInput</p>
          </div>
          <div className=" ml-2 w-16 h-16 bg-black"></div>
          <div className="flex flex-col ml-2 justify-center max-w-max ">
            <h6>Event Name</h6>
            <h6>tickets sold</h6>
          </div>
          <div className="flex place-content-center lg:place-content-end items-center lg:w-9/12 w-full mt-2 ">
            <Button size="sm" color="deep-orange">Make a change</Button>
          </div>
        </div>
      </div>
    </>
  );
};
