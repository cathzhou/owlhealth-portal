import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import { AuthProvider } from "../contexts/authContext";
import { useRoutes } from "react-router-dom";
import Login from '../components/auth/login';
import centerMap from '../img/aboutPage/wellnessCenter.webp';

import './AboutUsPage.css';
import { HomePage } from './HomePage';


export function AboutUsPage(): JSX.Element {
    const history = useNavigate();

    
    return (
        <AuthProvider> 
            <div className="about-us-page">
                <h1>Rice Student Health Services provides preventive and outpatient clinical care for the students of Rice University.</h1>
                <img src={centerMap} alt="Rice Student Health Services" className="wellness-center-location" /> 
                <p>Student Health is located on-campus and is dedicated to meeting undergraduate and graduate students' unique needs, 
                    emphasizing prevention. We see all students regardless of their insurance. 
                    Appointments are included in student fees. Additional labs, vaccines, etc., 
                    charges may be paid via credit card. Students are seen in person at student health.</p>

                
                
            </div>
        </AuthProvider>
    );
}