import React, { useState, useEffect } from "react";
import {
  UserWithoutPasswordType,
  OrganizationType,
  OrganizationApprovalType,
} from "../../../shared/zodSchemas";

type Request = {
  organization: OrganizationType;
  owner: UserWithoutPasswordType;
};
const Table = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const authToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/orgs/pending/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const res = await response.json();

        setRequests(res.data);
      } else {
        console.error("Failed to fetch organization requests");
      }
    } catch (error) {
      console.error("Error fetching organization requests:", error);
    }
  };
  const handleAccept = async (id: string) => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const acceptBody: OrganizationApprovalType = {
        decision: "Approved",
      };
      const authToken = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/orgs/${id}/orgApproval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(acceptBody),
        },
      );
      if (response.ok) {
        fetchRequests();
      } else {
        console.error("Failed to approve organization request");
      }
    } catch (error) {
      console.error("Error updating organization requests:", error);
    }
  };

  const handleDecline = async (id: string, rejectionReason?: string) => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const rejectBody: OrganizationApprovalType = {
        decision: "Rejected",
        rejectionReason,
      };
      const authToken = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/orgs/${id}/orgApproval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(rejectBody),
        },
      );
      if (response.ok) {
        fetchRequests();
      } else {
        console.error("Failed to reject organization request");
      }
    } catch (error) {
      console.error("Error updating organization requests:", error);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US"); // Customize the format as needed
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Customize the format as needed
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div>
      <h2>Requests Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date/Time</th>
            <th>Owner</th>
            <th>Accept</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.organization.id}>
              <td>{request.organization.organizationName}</td>
              <td>{request.organization.description}</td>
              <td>
                {formatDateTime(request.organization.createdAt.toString())}
              </td>
              <td>{request.owner.username}</td>
              {/* // put a message field here for reason */}
              <td>
                <button
                  className="accept-button"
                  onClick={() => handleAccept(request.organization.id)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  className="decline-button"
                  onClick={() => handleDecline(request.organization.id)}
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
