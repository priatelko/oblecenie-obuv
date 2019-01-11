import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

export let ContainerInjector: Injector;

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ContainerGetterModule {
  constructor(private injector: Injector) {
    ContainerInjector = this.injector;
  }
}
