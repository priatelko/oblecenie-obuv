import { NgModule, Injector } from '@angular/core';

export let ContainerInjector: Injector;

@NgModule({
  declarations: []
})
export class ContainerGetterModule {
  constructor(private injector: Injector) {
    ContainerInjector = this.injector;
  }
}
