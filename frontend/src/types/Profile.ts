export type UserProfileHeaderType = {
  user: {
    attended: number;
    following: number;
    image: string;
    name: string;
    organizations: number;
    programs: string[];
  };
};

export type settingsForm = {
  password?: string;
  degreeName: string;
  firstName: string;
  lastName: string;
};
