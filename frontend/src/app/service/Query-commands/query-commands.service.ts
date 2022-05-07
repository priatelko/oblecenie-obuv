import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserManagerService } from '../User/user-manager.service';
import { forEach, clone, keys } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class QueryCommandsService {
  readonly QUERY_COMMANDS = ['cR', 'fP'];
  requestedQuery = [];
  requestedCount = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserManagerService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      forEach(params, (param, command) => {
        if (this.isAllowed(command)) {
          this.requestedQuery.push(command);
          this.proccessCommand(command, param);
        }
      });
    });
  }

  private proccessCommand(command, param) {
    switch (command) {
      case 'cR':
        if (String(param).length === 64) {
          this.userService.applyConfirmation(param).subscribe((result) => {
            this.proccessResultQuery(command);
          });
        }
        break;
      case 'fP':
        if (String(param).length === 64) {
          this.userService
            .confirmForgottenPassword(param)
            .subscribe((result) => {
              this.proccessResultQuery(command);
            });
        }
        break;
    }
  }

  private isAllowed(command): boolean {
    return this.QUERY_COMMANDS.indexOf(command) !== -1;
  }

  private proccessResultQuery(command) {
    this.requestedCount++;

    delete this.requestedQuery[command];

    if (this.requestedCount === this.requestedQuery.length) {
      this.router.navigate(['/']);
    }
  }
}
