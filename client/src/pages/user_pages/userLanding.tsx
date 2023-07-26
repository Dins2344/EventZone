import Organizers from "../../components/user_components/body_components/Organizers"
import HeroComponent from "../../components/user_components/body_components/hero"
import MoreEvents from "../../components/user_components/body_components/moreEvents"
const Body = ()=>{
    return(
        <>
        <div className="mb-10">
        <HeroComponent />
        <MoreEvents />
        <Organizers />
        </div>
        </>
    )
}

export default Body