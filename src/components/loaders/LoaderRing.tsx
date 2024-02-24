import { ColorRing } from "react-loader-spinner"

export const LoaderRing:React.FC = () => {
    return (
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#375A64', '#8d8d8d', '#F3F6F4', '#FDBABF', '#FF4F5A']}
        />
    )
}