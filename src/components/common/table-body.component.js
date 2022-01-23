const TableBody = ({ items, columns }) => {
    return (
        <>
            <tbody>
                {items.map((item) => {
                    return (
                        <tr>
                            {columns.map((col) => {
                                return col.content(item, col.path);
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
};

export default TableBody;
