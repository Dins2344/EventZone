import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { getAllCities } from "../../../api/organizer/organizer";
import { RegisteredCityInterface } from "../../../types/adminInterface";
import { useDispatch } from "react-redux";
import { setSearchData } from "../../../redux/reducers/searchData";
import { useNavigate } from "react-router-dom";

const SearchBoxComponents: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [cities,setCities]=useState<RegisteredCityInterface[]>()
  const [searchText,setSearchText] = useState('')
  const [city,setCity] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const handleOpen = () => setOpen(!open);

  useEffect (()=>{
    fetchCities()
  },[])

  const fetchCities = async()=>{
    const data = await getAllCities()
    setCities(data?.data.data)
  }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = {searchText,city}
        dispatch(setSearchData(data))
        handleOpen()
        navigate('/search-events')
    }
  return (
    <>
      <div
        onClick={handleOpen}
        className="flex p-3 h-8 md:h-12 w-min md:w-80 items-center self-center hover:cursor-pointer text-gray-400 md:bg-blue-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clip-rule="evenodd"
          />
        </svg>
        <p className="ml-4 hidden md:block">Search events</p>
      </div>

      <Dialog size="xxl" open={open} handler={handleOpen}>
        <DialogBody>
          <div className="flex w-full justify-end ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 hover:cursor-pointer"
              onClick={handleOpen}
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col lg:mt-28 md:mt-16 mt-5 lg:px-40 md:px-24 px-2 w-full">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 mr-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <div className="w-52 mr-3">
                <Input
                  variant="standard"
                  placeholder="Search anything"
                  className="w-52 h-10 border-b-2"
                  value={searchText}
                  onChange={(e)=>{
                    setSearchText(e.target.value)
                  }}
                ></Input>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 hover:cursor-pointer"
                onClick={handleSubmit}
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center md:mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 mr-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <select
                id="countries"
                className="border-none text-gray-900 text-sm rounded-lg"
                onChange={(e)=>{
                    setCity(e.target.value)
                }}
              >
                <option value='' selected>Choose a city</option>
                {cities && cities.map((item)=>{
                   return <option key={item._id} value={item.cityName}>{item.cityName}</option>
                })}
                
              </select>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SearchBoxComponents;
