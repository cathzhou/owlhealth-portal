import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import './LandingPage.css';


export function LandingPage(): JSX.Element {
    const history = useNavigate();

    return (
        <div className="landing-page">
            <h1>Welcome to Rice Student Health Portal</h1>
            <p>Your one-stop solution for health services</p>
            <Button variant="contained" color="primary">
                Login with Google
            </Button>
        </div>
    );
}