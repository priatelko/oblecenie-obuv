import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  declarations: [
    DemoComponent
  ],
  exports: [
    DemoComponent
  ]
})

export class DemoModule { }
