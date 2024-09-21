import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";


const LandingPage = () => {
    const history = useNavigate();

    const handleLogin = () => {
        navigate('/login');

        return (
            <div className="landing-page">
                <h1>Welcome to Student Health Portal</h1>
                <p>Your one-stop solution for health services</p>
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </div>
        );
    };
}
export default LandingPage;