import { IEnvironment } from '../shared/environment.model';

export const mockedEnv: IEnvironment = {
  production: false,
  backend: {
    baseUrl: 'some url',
    websiteUrl: 'string',
    inhouseUrl: 'string'
  },
};
 