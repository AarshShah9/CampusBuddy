export type UserDataType = {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  attended: number;
  following: number;
  organizations: number;
  programs: string[];
  degreeName: string;
  firstTimeLogin: boolean;
};

export type OrganizationDataType = {
  id: string;
  firstName: string;
  lastName: string;
  organizationId: string[];
  organizationName: string[];
  organizationImage: string[];
  organizationDescription: string[];
  members: number;
  posts: number;
  type: UserType;
};

export type UserType = "Organization_Admin" | "Student";
