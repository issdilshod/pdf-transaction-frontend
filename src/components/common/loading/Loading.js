
import './Loading.scss';
import LoadingSvg from '../../../assets/img/loading.svg';

const Loading = () => {

    return (
        <div className="loading">
            <div>
                <span></span><img src={LoadingSvg} alt='loading...' />
            </div>
        </div>
    )
}

export default Loading;