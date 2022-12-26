function Table({ listCaterogy }) {
    return (
        <table className="table" style={{ width: '100%' }}>
            <tr>
                <th className="table_th">ID</th>
                <th className="table_th">Name</th>
                <th className="table_th">Số lượng sản phẩm</th>
            </tr>
            {listCaterogy.map((caterogy) => {
                return (
                    <tr>
                        <td className="table_td">{caterogy.id}</td>
                        <td className="table_td">{caterogy.name}</td>
                        <td className="table_td">{caterogy.count_products}</td>
                    </tr>
                );
            })}
        </table>
    );
}

export default Table;
