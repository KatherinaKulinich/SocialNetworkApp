import { ColorRing } from "react-loader-spinner"

interface LoaderRingProps {
    size: number;
}


export const LoaderRing:React.FC<LoaderRingProps> = ({size}) => {
    return (
        <ColorRing
            visible={true}
            height={size}
            width={size}
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#375A64', '#8d8d8d', '#F3F6F4', '#FDBABF', '#FF4F5A']}
        />
    )
}