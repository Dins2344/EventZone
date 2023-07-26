import SearchComponents from "../../components/user_components/searchComponents"

const SearchPage :React.FC = ()=>{
    return(
        <>
        <div className="lg:px-36 md:px-24 px-4 py-10 min-h-screen">
            <SearchComponents />
        </div>
        </>
    )
}

export default SearchPage