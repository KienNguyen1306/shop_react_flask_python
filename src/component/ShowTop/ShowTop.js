import { useEffect, useState } from 'react';

import { TbArrowUp } from 'react-icons/tb';

import './ShowTop.css';

function ShowTop() {
    const [hide, sethide] = useState(false);
    useEffect(() => {
        document.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight) {
                sethide(true);
            } else {
                sethide(false);
            }
        });
    }, []);

    function handolgototop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <>
            {hide && (
                <div className="scroll_top" onClick={handolgototop}>
                    <TbArrowUp />
                </div>
            )}
        </>
    );
}

export default ShowTop;
