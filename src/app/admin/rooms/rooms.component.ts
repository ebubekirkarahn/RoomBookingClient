import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {Room} from '../../model/Room';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of rooms';
  reloadAttempts = 0;
  isAdminUser = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService : FormResetService,
              private authService: AuthService) { }


    loadData() {
      this.dataService.getRooms().subscribe(
        (next) => {
          this.rooms = next;
          this.loadingData = false;
          this.processUrlParams();
        },
        (error) => {
          if (error.status === 402) {
            this.message  = 'Sorry - you need to pay to use this application. ';
          } else {
            this.reloadAttempts++;
            if (this.reloadAttempts <= 10) {
              this.message = 'Sorry - something went wrong, trying again.... please wait ';
              this.loadData();
            } else {
              this.message = 'Sorry - something went wrong, please contact support.';
            }

          }
        }
      );
    }

  processUrlParams() {
    this.route.queryParams.subscribe(
      (params) => {
        this.action = null;
        const id = params['id'];
        if (id) {
          this.selectedRoom = this.rooms.find( room => room.id === +id);
          this.action = params['action'];
        }
        if (params['action'] === 'add') {
          this.selectedRoom = new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    );
  }

  ngOnInit() {
    this.loadData();
    console.log('role', this.authService.role);
    if (this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }
    this.authService.roleSetEvent.subscribe(
      next => {
        if (next === 'ADMIN') {
          this.isAdminUser = true;
        }
        else {
          this.isAdminUser = false;
        }
      }
    );
  }

  setRoom(id: number) {
    this.router.navigate(['admin','rooms'], {queryParams : {id, action : 'view'} });
  }

  addRoom() {
    this.router.navigate(['admin','rooms'], {queryParams : {action : 'add'} });
  }

}
