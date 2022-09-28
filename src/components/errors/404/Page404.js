import { Link } from "react-router-dom";

const Page404 = () => {

    return (
        <div className="container-fluid">
            <div className="c-error-block">
                <div className="c-error">404</div>
                <div className="c-error-msg">Oops! This Page Could Not Be Found</div>
                <Link to={'/dashboard/'}>Go Back</Link>
            </div>
        </div>
    )
}

export default Page404;