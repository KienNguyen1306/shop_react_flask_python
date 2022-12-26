function Banner_adminItem({ stt, datas, onUpdate, ondelete }) {
    return (
        <div className="banner_body_header item">
            <div className="banner_body_header-item">{stt}</div>
            <div className="banner_body_header-item">
                <img src={datas.image} alt="" />
            </div>
            <div className="banner_body_header-item">
                <button
                    className="btn_action"
                    type=""
                    onClick={() => {
                        onUpdate(datas.id, datas.image);
                    }}
                >
                    Update
                </button>
                <button className="btn_action" type="" onClick={() => ondelete(datas.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Banner_adminItem;
