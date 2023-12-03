import React, { useState, useEffect } from 'react';
import './App.css';

interface Request {
    id: number;
    name: string;
    organization: string;
    time: string;
    message: string;
}

const App = () => {
    const [requests, setRequests] = useState<Request[]>([]);

    // Fake data for demonstration
    const mockData: Request[] = [
        { id: 1, name: 'John Doe', organization: 'Org 1', time: '10:00 AM', message: 'Request 1' },
        { id: 2, name: 'Jane Smith', organization: 'Org 2', time: '11:00 AM', message: 'Request 2' },
    ];

    useEffect(() => {
        // Replace this with actual backend call
        console.log('Fetching data from backend');
        setRequests(mockData);
    }, []);

    const handleAccept = (id: number) => {
        // Replace this with actual backend call
        console.log(`Accept request with ID: ${id}`);
        // Add logic to update the state or handle the response
    };

    const handleDecline = (id: number) => {
        // Replace this with actual backend call
        console.log(`Decline request with ID: ${id}`);
        // Add logic to update the state or handle the response
    };

    return (
        <div className="App">
            <h2>Requests Dashboard</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Organization</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Accept</th>
                    <th>Decline</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.name}</td>
                        <td>{request.organization}</td>
                        <td>{request.time}</td>
                        <td>{request.message}</td>
                        <td>
                            <button className="accept-button" onClick={() => handleAccept(request.id)}>Accept</button>

                        </td>
                        <td>
                            <button className="decline-button" onClick={() => handleDecline(request.id)}>Decline</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
