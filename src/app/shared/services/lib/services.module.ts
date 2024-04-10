import { NgModule } from '@angular/core';

import { IEnvironment } from './shared/environment.model';
import { ENVIRONMENT_INJECT_TOKEN } from './shared/constants';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
})
export class ServicesModule {
  public static forRoot(env: IEnvironment) {
    return {
      ngModule: ServicesModule,
      providers: [{ provide: ENVIRONMENT_INJECT_TOKEN, useValue: env }],
    };
  }
}
