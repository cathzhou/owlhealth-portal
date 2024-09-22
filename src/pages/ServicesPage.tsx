import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import { AuthProvider } from "../contexts/authContext";
import { useRoutes } from "react-router-dom";
import Login from '../components/auth/login';
//import centerMap from '../img/aboutPage/wellnessCenter.webp';

import './ServicesPage.css';
//import { HomePage } from './HomePage';

    
export function ServicesPage(): JSX.Element {
    const servicesData = [
        { service: 'Contraception Consults', price: 'Free', alternative: 'Baylor Teen Clinic - Free' },
        { service: 'Gastrointestinal Conditions', price: 'Free', alternative: '--' },
        { service: 'Genito-Urinary Conditions', price: 'Free', alternative: '--' },
        { service: 'Illness/Sick Visits', price: 'Free', alternative: '--' },
        { service: 'Physical Exams', price: 'Free, but limited', alternative: '--' },
        { service: 'Respiratory Conditions', price: 'Free', alternative: '--' },
        { service: 'Skin Conditions', price: 'Free', alternative: '--' },
        { service: 'TB PPD Skin Test', price: '$8', alternative: 'Houston Medical Center - $40' },
        { service: 'TB Quantiferon Blood Test', price: '$65', alternative: 'Houston Medical Center - $40' },
        { service: 'Influenza (Seasonally)', price: '$0', alternative: 'CVS Pharmacy - $25' },
        { service: 'Hepatitis A', price: '$15', alternative: 'CVS Pharmacy - $25' },
        { service: 'Hepatitis B', price: '$15', alternative: 'CVS Pharmacy - $25' },
        { service: 'Meningitis', price: '$15', alternative: 'CVS Pharmacy - $25' },
        { service: 'HPV', price: '$15', alternative: 'CVS Pharmacy - $25' },
        { service: 'Tetanus', price: '$15', alternative: 'CVS Pharmacy - $25' },
        { service: 'Mental Health Counseling', price: 'Free', alternative: 'BetterHelp Online - $60' },
        { service: 'STI Testing - HIV', price: '$15', alternative: 'Baylor Teen Clinic - Free' },
        { service: 'STI Testing - Syphillis', price: '$5', alternative: 'Baylor Teen Clinic - Free' },
        { service: 'STI Testing - Gonhorrea/Chlamydia', price: '$26', alternative: 'Baylor Teen Clinic - Free' },
        { service: 'Pap Smear', price: '$25', alternative: 'Baylor Teen Clinic - Free' },
        { service: 'Pap Smear with HPV High Risk', price: '$65', alternative: 'Baylor Teen Clinic - Free' },
    ];
    

    return (
        <div className="services-page">
            <h1>Available Services at Rice Student Health Services</h1>
            <p>
                Rice Student Health Services offers a wide range of medical services at affordable rates. 
                Below is a list of services, their costs at Rice, and alternative off-campus options.
            </p>
            
            <table className="services-table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Price at Rice</th>
                        <th>Alternative Off-Campus Resource</th>
                    </tr>
                </thead>
                <tbody>
                    {servicesData.map((service, index) => (
                        <tr key={index}>
                            <td>{service.service}</td>
                            <td>{service.price}</td>
                            <td>{service.alternative}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
