import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PagesBlock = ({ blockIndex, block}) => {

    const [blockShow, setBlockShow] = useState(false);

    return (
        
        <div className='c-card mt-2'>
            <div className='c-card-head t-cursor-pointer' onClick={ () => { setBlockShow(!blockShow) } }>Page {blockIndex+1}</div>
            <div className='c-card-body c-white-space'>
                { blockShow &&
                <>
                    <div>
                        {
                            window.atob(block['content'])
                        }
                    </div>
                </>
                }
            </div>
        </div>
    )

}

export default PagesBlock;