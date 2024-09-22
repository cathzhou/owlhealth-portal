import { useNavigate } from 'react-router-dom';
import { Flex, Button } from "@mantine/core";
import {navigate} from "@storybook/addon-links";
import { AuthProvider } from "../contexts/authContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRoutes } from "react-router-dom";
import Login from '../components/auth/login';
import centerMap from '../img/aboutPage/wellnessCenter.webp';
import { auth } from '../firebase.config';


import './BillingPage.css';
import { HomePage } from './HomePage';


export function BillingPage(): JSX.Element {
    const [user] = useAuthState(auth);
    const profileName = user?.displayName
    const history = useNavigate();
    const balance = 8.27; // Placeholder for the current balance
    const transactionHistory = [
      { date: '09/15/2024', amount: '$8.27', description: 'TB PPD Skin Test Payment', status:'UNPAID' },
      { date: '08/01/2024', amount: '$5.48', description: 'Syphillis Test', status:'PAID' },
      { date: '07/12/2024', amount: '$16.10', description: 'HPV Vaccine', status:'PAID' },
    ]; // Placeholder transaction history
    
    return (
      <AuthProvider>
        <div className="billing-page">
          <h2>Current Owed Balance for {profileName}: ${balance}</h2>
          <h1>Make a Payment</h1>
          <Flex
            mih={50}
            //bg="rgba(255, 255, 255)"
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
        >
    
          <Button
            component="a"
            href="https://tnmgmt.rice.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log into TouchNet
          </Button>
          </Flex>
          <h1>Payment History</h1>
          <Flex
            align="center"
            justify="center"
          >
          <table className="transaction-history">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </Flex>
        </div>
      </AuthProvider>
    );
  }