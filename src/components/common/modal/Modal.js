


const Modal = ({ Content, Show }) => {

    return (
        <div className={`c-modal ${ Show?'':'c-modal-hide'}`}>
            <div className='c-modal-window'>
                <Content />
            </div>
        </div>
    )
}

export default Modal;