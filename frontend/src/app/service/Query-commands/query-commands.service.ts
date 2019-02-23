import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../User/user.service';
import { forEach, clone, keys } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class QueryCommandsService {

  readonly QUERY_COMMANDS = ['cR', 'fP'];
  stableQuery = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.stableQuery = clone(params);

      forEach(params, (value, query) => {
        this.proccessCommand(query, value);
      });

      this.router.navigate(['/'], { queryParams: this.stableQuery});
    });
  }

  private isAllowed(query): boolean {
    return this.QUERY_COMMANDS.indexOf(query) !== -1;
  }

  private proccessCommand(query, value) {
    if (!this.isAllowed(query)) {
      return;
    }

    switch (query) {
      case 'cR':
        if (String(value).length === 64) {
          this.userService.applyConfirmation(value);
        }
        break;
      case 'fP':
        if (String(value).length === 64) {
          this.userService.confirmForgottenPassword(value);
        }
        break;
    }

    delete this.stableQuery[query];
  }
}
