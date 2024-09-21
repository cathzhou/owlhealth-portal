import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import { AuthProvider } from "../contexts/authContext";
import { useRoutes } from "react-router-dom";
import Login from '../components/auth/login';

import './LandingPage.css';
import { HomePage } from './HomePage';


export function LandingPage(): JSX.Element {
    const history = useNavigate();

    
    return (
        <AuthProvider> 
            <div className="landing-page">
                <h1>Welcome to the Rice Student Health Portal</h1>
                <p>Your one-stop solution for health services</p>
                <Login />
            </div>
        </AuthProvider>
    );
}