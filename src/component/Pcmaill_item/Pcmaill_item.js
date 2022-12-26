import './Pcmall_item.css';
function Pcmall_item({ image, title }) {
    return (
        <div className="pcmall_item" data-aos="fade-up">
            <div className="pcmall_item_image">
                <img src={image} alt="" />
            </div>
            <p className="pcmall_item_sub">{title}</p>
        </div>
    );
}

export default Pcmall_item;
