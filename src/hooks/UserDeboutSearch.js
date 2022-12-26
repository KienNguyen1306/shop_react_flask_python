import { useState, useEffect } from 'react';

function UserDeboutSearch(value, delay) {
    const [valueSearch, setvalue] = useState(value);

    useEffect(() => {
        let clear = setTimeout(() => {
            setvalue(value);
        }, delay);
        return () => {
            clearTimeout(clear);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return valueSearch;
}

export default UserDeboutSearch;
