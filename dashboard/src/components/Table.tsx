import React, { useState, useEffect } from "react";

interface Request {
  id: number;
  name: string;
  organization: string;
  time: string;
  message: string;
}

const Table = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const token = localStorage.getItem(authToken);
      const response = await fetch("http://localhost:3000/api/orgs/pending/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setRequests(data);
      } else {
        console.error("Failed to fetch organization requests");
      }
    } catch (error) {
      console.error("Error fetching organization requests:", error);
    }
  };
  const handleAccept = async (id: number) => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const response = await fetch(`http://localhost:3000/api/orgs/:${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Approved" }),
      });
      if (response.ok) {
        fetchRequests();
      } else {
        console.error("Failed to update organization request");
      }
    } catch (error) {
      console.error("Error updating organization requests:", error);
    }
  };

  const handleDecline = async (id: number) => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const response = await fetch(`http://localhost:3000/api/orgs/:${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Rejected" }),
      });
      if (response.ok) {
        fetchRequests();
      } else {
        console.error("Failed to update organization request");
      }
    } catch (error) {
      console.error("Error updating organization requests:", error);
    }
  };

  return (
    <div>
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
                <button
                  className="accept-button"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  className="decline-button"
                  onClick={() => handleDecline(request.id)}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
