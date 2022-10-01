import { useParams } from "react-router-dom";


const Statement = () => {
    const { id } = useParams();

    return (
        <div>statement {id}</div>
    );
}

export default Statement;