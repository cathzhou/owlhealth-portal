import "./detail.css";

const Detail = () => {
    return (
        <div className='detail'>
            <div className="doctor-info">
                <img src="src/img/doctoravatar.png" alt="Doctor Avatar" className="doctor-avatar" />
                <div className="doctor-details">
                    <h2>Dr. Trotter</h2>
                    <p>Specialization: Pulmonology</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>
            <div className="doctor-availability">
                <h3>Availability</h3>
                <ul>
                    <li>Monday: 9:00 AM - 5:00 PM</li>
                    <li>Tuesday: 9:00 AM - 5:00 PM</li>
                    <li>Wednesday: 9:00 AM - 5:00 PM</li>
                    <li>Friday: 9:00 AM - 5:00 PM</li>
                </ul>
            </div>
        </div>
    );
}

export default Detail;