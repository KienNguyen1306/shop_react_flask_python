import './Heading.css';

function Heading({ title }) {
    return (
        <h2 data-aos="fade-right" className="heading">
            {title}
        </h2>
    );
}

export default Heading;
