export interface IUser{
    _id?: string;
    username: string;
    password: string;
    isAdmin?: boolean;
    hasVoted?: boolean;
    votedFor?: string | null;
  }