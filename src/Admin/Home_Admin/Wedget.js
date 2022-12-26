import { Link } from 'react-router-dom';
import { RiArrowDropUpLine } from 'react-icons/ri';

function Wedget({ length, title, subtitle, link ,icon}) {
    return (
        <div className="wedget">
            <div className="wedget_left">
                <span className="wedget_left-title">{title}</span>
                <span className="wedget_left-container">{length}</span>
                <Link to={link} className="wedget_left-link">
                    {subtitle}
                </Link>
            </div>
            <div className="wedget_right">
                <div className="wedget_right_top">
                    <RiArrowDropUpLine className="wedget_right_top-icon" />
                    25%
                </div>
                <div className="wedget_right_top_botom">
                    <div className="wedget_icon_pren">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wedget;
