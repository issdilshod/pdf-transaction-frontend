
import { Context } from "../../../contexts/Context";
import Collect from "../../common/Collect";

import UserPage from "./UserPage";

const User = () => {

    return (
        <Context.Provider value={
            {}
        }>
            <Collect MainContent={UserPage} />
        </Context.Provider>
    )
}

export default User;