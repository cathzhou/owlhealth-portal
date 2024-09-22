import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import { AuthProvider } from "../contexts/authContext";
import { useRoutes } from "react-router-dom";
import Login from '../components/auth/login';
import centerMap from '../img/aboutPage/wellnessCenter.webp';

//import './AboutUsPage.css';
import { HomePage } from './HomePage';


export function BillingPage(): JSX.Element {
    const history = useNavigate();

    
    return (
        <AuthProvider> 
            <div className="billing-page">
                <h1>Billing!!</h1>
                <p>pay. </p>

                
                

                
            </div>
        </AuthProvider>
    );
}