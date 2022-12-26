function Uer_admin_item({ stt, datas }) {
    return (
        <div className="user_admin_item">
            <div className="user_body_header-id">{stt}</div>
            <div className="user_body_header-name">{datas.name}</div>
            <div className="user_body_header-email">{datas.email}</div>
            <div className="user_body_header-avatar">
                <div className="user_body_header-avatar-image">
                    <img src={datas.avatar} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Uer_admin_item;
