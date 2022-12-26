function Caterogy_item({ stt, datas, onUpdate, onDELETE }) {
    return (
        <div className="caterogy_admin_item">
            <div className="user_body_header-id">{stt}</div>
            <div className="user_body_header-name">{datas.name}</div>
            <div className="user_body_header-id">
                <button
                    className="btn_action"
                    type=""
                    onClick={() => {
                        onUpdate(datas.name);
                    }}
                >
                    Update
                </button>
                <button className="btn_action" type="" onClick={() => onDELETE(datas.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Caterogy_item;
