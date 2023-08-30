import { MagnifyingGlass } from  'react-loader-spinner'
import { theme } from '@styles/Theme'


export const LoaderGlass: React.FC = () => {
    return (
        <MagnifyingGlass
            visible={true}
            height="180"
            width="180"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = {theme.colors.lightGray}
            color = {theme.colors.regular}
        />
    )
}