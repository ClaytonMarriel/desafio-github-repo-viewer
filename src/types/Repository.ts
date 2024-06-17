// types/Repository.ts

export interface Repository {
  id: string;
  name: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  description: string;
  stargazerCount: number;
  forkCount: number;
  defaultBranchRef?: {
    target: {
      history: {
        totalCount: number;
      };
    };
  };
  issues?: {
    totalCount: number;
  };
  pullRequests?: {
    totalCount: number;
  };
}
