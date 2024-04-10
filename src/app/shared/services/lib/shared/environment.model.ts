export interface IEnvironment {
  production: boolean;
  backend: {
    baseUrl: string;
    websiteUrl: string;
    inhouseUrl: string;
  };
}
