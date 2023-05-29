import { Injectable } from '@angular/core';
import {Room} from './model/Room';
import {Observable} from 'rxjs';
import {Resolve} from '@angular/router';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefectchRoomsService implements Resolve<Observable<Array<Room>>>{

  constructor(private dataService: DataService) { }

  resolve() {
    return this.dataService.getRooms();
  }
}
