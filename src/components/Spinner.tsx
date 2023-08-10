import { Comment } from  'react-loader-spinner'

export const Spinner:React.FC = () => {
    return (
        <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#CB3F47"
        />
    )
}