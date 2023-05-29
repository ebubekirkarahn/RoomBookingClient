import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './model/User';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefectchUsersService implements Resolve<Observable<Array<User>>>{

  constructor(private dataService: DataService) { }

  resolve() {
    return this.dataService.getUsers();
  }
}
