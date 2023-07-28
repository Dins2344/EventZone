import { useEffect, useState } from "react";
import {
  getAllCities,
  getEventCategories,
} from "../../api/organizer/organizer";
import {
  RegisteredCityInterface,
  eventCategoryInterface,
} from "../../types/adminInterface";
import { Input, Radio } from "@material-tailwind/react";
import { selectSearchData } from "../../redux/reducers/searchData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearSearchData } from "../../redux/reducers/searchData";
import { getSearchData } from "../../api/userAuth/userApis";
import { RegisteredOrganization } from "../../types/userInterface";
import { RegisteredEventInterface } from "../../types/organizerInterface";
import { useNavigate } from "react-router-dom";

const SearchComponents: React.FC = () => {
  const [cities, setCities] = useState<RegisteredCityInterface[]>();
  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [searchFor, setSearchFor] = useState("event");
  const [searchedData, setSearchedData] = useState<
    RegisteredEventInterface[] | RegisteredOrganization[]
  >();
  const searchData = useSelector(selectSearchData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCities();
    setSearchInput();
  }, []);

  useEffect(() => {
    fetchSearchData();
  }, [searchText, city, price, category, searchFor]);

  const setSearchInput = () => {
    if (searchData) {
      setSearchText(searchData?.searchText);
      setCity(searchData?.city);
      dispatch(clearSearchData());
    }
  };
  const fetchCities = async () => {
    const data = await getAllCities();
    setCities(data?.data.data);
  };

  const fetchSearchData = async () => {
    const data = await getSearchData(
      searchFor,
      searchText,
      city,
      price,
      category
    );
    setSearchedData(data?.data.data);
  };

  return (
    <>
      <div className="w-full flex flex-col pb-3 border-b-4">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-3"
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
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></Input>
          </div>
        </div>
        <div className="flex items-center md:mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-3"
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
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            {city ? (
              <option value={city} selected>
                {city}
              </option>
            ) : (
              <option value="" selected>
                Choose a city
              </option>
            )}
            {cities &&
              cities.map((item) => {
                return (
                  <option key={item._id} value={item.cityName}>
                    {item.cityName}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-4/12 flex flex-col">
          <FilterElements
            setPrice={setPrice}
            price={price}
            category={category}
            setCategory={setCategory}
            searchFor={searchFor}
            setSearchFor={setSearchFor}
          />
        </div>
        <div className="w-8/12 flex flex-col">
          {searchedData ? (
            <SearchedEvents data={searchedData} searchFor={searchFor} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchComponents;

interface FilterChildProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  searchFor: string;
  setSearchFor: React.Dispatch<React.SetStateAction<string>>;
}

const FilterElements: React.FC<FilterChildProps> = ({
  price,
  category,
  setPrice,
  setCategory,
  searchFor,
  setSearchFor,
}) => {
  const [eventCategories, setEventCategories] =
    useState<eventCategoryInterface[]>();

  const [orgMode, setOrgMode] = useState(false);
  useEffect(() => {
    fetchEventCategories();
  }, []);
  const fetchEventCategories = async () => {
    const data = await getEventCategories();
    setEventCategories(data?.data.data);
  };

  const handlePrice = (e: any) => {
    if (e.target.value === price) {
      setPrice("");
    } else {
      setPrice(e.target.value);
    }
  };
  const handleCategory = (e: any) => {
    if (e.target.value === category) {
      setCategory("");
    } else {
      setCategory(e.target.value);
    }
  };
  const handleSearchFor = (e: any) => {
    if (e.target.value === searchFor) {
      setSearchFor("");
    } else {
      setSearchFor(e.target.value);
    }
    e.target.value === "organizer" && setOrgMode(true);
    if (e.target.value === "event" || e.target.value === "") setOrgMode(false);
    setCategory("");
    setPrice("");
  };

  return (
    <>
      <h3 className="text-xl md:text-3xl font-bold">Filters</h3>
      <div className="flex flex-col mt-3">
        <h5 className="text-lg md:text-xl font-semibold">Search for</h5>
        <label className="w-auto mt-1 mb-1">
          <input
            type="radio"
            onClick={handleSearchFor}
            checked={searchFor === "organizer"}
            value="organizer"
            name="organizer"
            className="mr-3"
          />
          Organizer
        </label>
        <label className="w-auto">
          <input
            type="radio"
            onClick={handleSearchFor}
            checked={searchFor === "event"}
            value="event"
            name="event"
            className="mr-3"
          />
          Event
        </label>
      </div>
      {!orgMode && (
        <div>
          <div className="flex flex-col mt-3">
            <h5 className="text-lg md:text-xl font-semibold">Price</h5>
            <label className="w-auto mt-1 mb-1">
              <input
                type="radio"
                onClick={handlePrice}
                checked={price === "free"}
                value="free"
                name="Price"
                className="mr-3"
              />
              Free
            </label>
            <label className="w-16">
              <input
                type="radio"
                onClick={handlePrice}
                checked={price === "charged"}
                value="charged"
                name="Price"
                className="mr-3"
              />
              Paid
            </label>
          </div>
          <div className="flex flex-col mt-3">
            <h5 className="text-lg md:text-xl font-semibold">Categories</h5>
            {eventCategories &&
              eventCategories.map((item) => {
                return (
                  <label key={item._id} className="w-auto mt-1 mb-1">
                    <input
                      type="radio"
                      onClick={handleCategory}
                      checked={category === item.categoryName}
                      value={item.categoryName}
                      name="Category"
                      className="mr-3"
                    />
                    {item.categoryName}
                  </label>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

type SearchedEventsProps = {
  data: RegisteredOrganization[] | RegisteredEventInterface[];
  searchFor: string;
};

const SearchedEvents: React.FC<SearchedEventsProps> = ({ data, searchFor }) => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log(data);
    console.log(searchFor);
  });
  return (
    <>
      <div className="w-full px-4">
        {searchFor === "organizer" ? (
          <>
            {data.map((item) => {
              return (
                <div
                  key={item._id}
                  className="w-full flex flex-wrap p-3 hover:shadow-md border-2 rounded-md mt-3"
                >
                  <img
                    className=" w-full md:w-48 rounded-md"
                    src={item.logo}
                  ></img>
                  <div className="flex flex-col pt-2 md:pt-0 md:pl-2">
                    <h3 className="text-lg md:text-2xl font-bold dark:text-white mb-3">
                      {item.orgName}
                    </h3>
                    <p>category: {item.orgType}</p>

                    <p>Country: {item.country}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {data && data.map((item) => {
              return (
                <div
                onClick={()=>navigate(`/show-event/?id=${item._id}`)}
                  key={item._id}
                  className="w-full flex flex-wrap p-3 hover:shadow-md border-2 rounded-md mt-3"
                >
                  <img
                    className=" w-full md:w-48 rounded-md"
                    src={item.imageURL[0]}
                  ></img>
                  <div className="flex flex-col pt-2 md:pt-0 md:pl-2">
                    <h3 className="text-lg md:text-2xl font-bold dark:text-white mb-3">
                      {item.eventName}
                    </h3>
                    <p>
                      on: {item.startDate},{item.startTime}
                    </p>
                    {item.ticketValue === "free" ? (
                      <p>{item.ticketValue}</p>
                    ) : (
                      <p>Price: {item.ticketPrice}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
