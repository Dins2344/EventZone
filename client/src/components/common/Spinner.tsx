import { Spinner } from "@material-tailwind/react"

const SpinnerComponent: React.FC = () => {
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <Spinner  className="w-14 h-14" />
        </div>
        </>
    )
}

export default SpinnerComponent