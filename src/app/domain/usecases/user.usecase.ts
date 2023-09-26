import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserGateway } from '@domain/gateways/user.gateway';
import { Auth } from '@domain/models/auth.model';
import { User } from '@domain/models/user.model';
import { Response } from '@domain/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UserUseCase {
  constructor(private userGateway: UserGateway) {}

  validate(auth: Auth): Promise<Response> {
    return this.userGateway.validate(auth);
  }

  update(auth: Auth): Promise<Response> {
    return this.userGateway.update(auth);
  }
  
  create(user: User): Promise<Response> {
    return this.userGateway.create(user);
  }
  
  updateUsers(user: User): Promise<Response> {
    return this.userGateway.updateUsers(user);
  }

  login(auth: Auth): Promise<boolean> {
    return this.userGateway.login(auth);
  }

}
