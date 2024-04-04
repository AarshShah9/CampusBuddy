import React, { useState, useEffect } from "react";
import {
  UserWithoutPasswordType,
  Item,
  OrganizationApprovalType,
} from "../../../shared/zodSchemas";
import { BACKEND_URL } from "../lib/constants";

type Request = {
  createdAt: string;
  description: string;
  endTime: string;
  id: string;
  image: string;
  isFlagged: boolean;
  isPublic: boolean;
  locationPlaceId: string;
  organizationId: string;
  startTime: string;
  status: string;
  title: string;
  userId: string;
};
const ItemTable = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
      const authToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/moderation/events/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (response.ok) {
        const res = await response.json();
        setRequests(res.data);
      }
    } catch (error) {
      console.error("Error fetching flagged items:", error);
    }
  };

  useEffect(() => {
    fetchRequests().then(() => setIsLoading(false));
  }, [updateTrigger]);

  console.log(requests);
  // const handleAccept = async (id: string) => {
  //   try {
  //     setIsLoading(true);
  //     // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
  //     const acceptBody: OrganizationApprovalType = {
  //       decision: "Approved",
  //     };
  //     const authToken = localStorage.getItem("token");

  //     const response = await fetch(
  //       `${BACKEND_URL}/api/orgs/${id}/orgApproval`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify(acceptBody),
  //       },
  //     );
  //     if (response.ok) {
  //       setUpdateTrigger((prev) => !prev);
  //     } else {
  //       console.error("Failed to approve organization request");
  //     }
  //   } catch (error) {
  //     console.error("Error updating organization requests:", error);
  //   }
  // };

  // const handleDecline = async (id: string, rejectionReason?: string) => {
  //   try {
  //     setIsLoading(true);
  //     // Replace 'your-api-endpoint' with your actual backend endpoint to fetch pending organization requests
  //     const rejectBody: OrganizationApprovalType = {
  //       decision: "Rejected",
  //       rejectionReason,
  //     };
  //     const authToken = localStorage.getItem("token");

  //     const response = await fetch(
  //       `${BACKEND_URL}/api/orgs/${id}/orgApproval`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //         body: JSON.stringify(rejectBody),
  //       },
  //     );
  //     if (response.ok) {
  //       setUpdateTrigger((prev) => !prev);
  //     } else {
  //       console.error("Failed to reject organization request");
  //     }
  //   } catch (error) {
  //     console.error("Error updating organization requests:", error);
  //   }
  // };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US"); // Customize the format as needed
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Customize the format as needed
    return `${formattedDate}, ${formattedTime}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div
          className="flex h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!-m-px flex !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date/Time
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Accept</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Decline</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {request.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDateTime(request.createdAt.toString())}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {/* {request.owner.firstName} {request.owner.lastName} */}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          // onClick={() => handleAccept(request.organization.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Accept
                          <span className="sr-only">
                            {/* ,{request.organization.organizationName} */}
                          </span>
                        </button>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          // onClick={() => handleDecline(request.organization.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Decline
                          <span className="sr-only">
                            {/* , {request.organization.organizationName} */}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTable;
