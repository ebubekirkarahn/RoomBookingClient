import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/User';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Array<Booking>;
  selectedDate : string;
  dataLoaded = false;
  message = '';
  isAdminUser = false;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
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

  loadData() {
    this.message = 'Loading data...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if (!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          },
          error => this.message = 'Sorry - the data could not be loaded.'
        );
      }
    );
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id :number) {
    const result = confirm('Are you sure you wish to delete this booking?');
    if (result) {
      this.message = 'deleting please wait...';
      this.dataService.deleteBooking(id).subscribe(
        next => {
          this.message = '';
          this.loadData();
        },
        error => {
          this.message = 'Sorry there was a problem deleting the item';
        }
      );
    }
  }

  dateChanged() {
    this.router.navigate([''], {queryParams : {date : this.selectedDate}});
  }

}
