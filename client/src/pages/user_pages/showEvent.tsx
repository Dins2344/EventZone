
const EventDetails = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id  = urlParams.get('id')
    console.log(id)
    return (
        <>
        <p>
            EventDetails{id}
        </p>
        </>
    )
}

export default EventDetails