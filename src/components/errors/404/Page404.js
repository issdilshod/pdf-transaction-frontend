import { useEffect } from "react";
import { Link } from "react-router-dom";

const Page404 = () => {

    useEffect(() => {
        document.title = 'Page Not Found! 404 Error';
    }, [])

    return (
        <div className="container-fluid">
            <div className="c-error-block">
                <div className="c-error">404</div>
                <div className="c-error-msg">Oops! This Page Could Not Be Found</div>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/dashboard/`}>Go Back</Link>
            </div>
        </div>
    )
}

export default Page404;