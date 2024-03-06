import { User, UserRole } from "@prisma/client";
import transporter from "./mailer";

export async function emailMembershipRequestApproved(
  user: User,
  organizationName: string,
  roleName: string,
) {
  let emailContent = "";
  let subject = "";

  // Customize the email content and subject based on the role name
  if (roleName === UserRole.Moderator) {
    subject = "Congratulations! You Are Now a Moderator";
    emailContent = `We are pleased to inform you that your request to become a moderator for <strong>${organizationName}</strong> has been approved!`;
  } else if (roleName === UserRole.Member) {
    subject = `Welcome to ${organizationName}`;
    emailContent = `Welcome to ${organizationName}! You are now a member of our community.`;
  } else {
    // For some generic role
    subject = `Your ${roleName} Role`;
    emailContent = `Your role as a ${roleName.toLowerCase()} for ${organizationName} has been approved.`;
  }

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: `${subject}`,
    html: `
        <p>Hello ${user.firstName},</p>
        <p>${emailContent}</p>
      `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailMembershipRequestRejected(
  user: User,
  organizationName: string,
  roleName: string,
  rejectionReason?: string,
) {
  let emailContent = "";
  let subject = "";
  const reasonText = rejectionReason
    ? ` Reason given: ${rejectionReason}.`
    : "";

  // Customize the email content and subject based on the role name
  if (roleName === UserRole.Moderator) {
    subject = `Your Moderator Request for ${organizationName} Has Been Rejected`;
    emailContent = `We regret to inform you that your request to become a moderator for <strong>${organizationName}</strong> has been rejected.${reasonText}`;
  } else if (roleName === UserRole.Member) {
    subject = `Membership Request Rejected for ${organizationName}`;
    emailContent = `We regret to inform you that your membership request for ${organizationName} has been rejected.${reasonText}`;
  } else {
    // For some generic role
    subject = `Request Rejected for ${roleName} Role at ${organizationName}`;
    emailContent = `We regret to inform you that your request for the ${roleName} role at ${organizationName} has been rejected.${reasonText}`;
  }

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: `${subject}`,
    html: `
        <p>Hello ${user.firstName},</p>
        <p>${emailContent}</p>
      `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailOrganizationRequestApproved(
  user: User,
  organizationName: string,
) {
  const subject = `Request to Create Organization Approved`;
  const emailContent = `We are pleased to inform you that your request to create the new organization <strong>${organizationName}</strong> has been approved! You have been set as the organization owner.`;

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject,
    html: `
          <p>Hello ${user.firstName},</p>
          <p>${emailContent}</p>
        `,
  };

  // Send the email
  await transporter.sendMail(message);
}

export async function emailOrganizationRequestRejected(
  user: User,
  organizationName: string,
  rejectionReason?: string,
) {
  const subject = `Request to Create Organization Rejected`;
  const reasonText = rejectionReason
    ? ` Reason given: ${rejectionReason}.`
    : "";
  const emailContent = `We regret to inform you that your request to create the new organization <strong>${organizationName}</strong> has been rejected.${reasonText}`;

  // Create the email message
  const message = {
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject,
    html: `
          <p>Hello ${user.firstName},</p>
          <p>${emailContent}</p>
        `,
  };

  // Send the email
  await transporter.sendMail(message);
}
