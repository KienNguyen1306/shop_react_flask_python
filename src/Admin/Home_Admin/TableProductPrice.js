function TableProductPrice({ listProductPrice }) {
    return (
        <table className="table" style={{ width: '100%' }}>
            <tr>
                <th className="table_th">ID</th>
                <th className="table_th">Name</th>
                <th className="table_th">Danh thu</th>
            </tr>
            {listProductPrice.map((caterogy) => {
                return (
                    <tr>
                        <td className="table_td">{caterogy.id}</td>
                        <td className="table_td">{caterogy.name}</td>
                        <td className="table_td">{String(caterogy.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</td>
                    </tr>
                );
            })}
        </table>
    );
}

export default TableProductPrice;
