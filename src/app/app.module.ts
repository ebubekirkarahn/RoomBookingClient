import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { UsersComponent } from './admin/users/users.component';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { EditBookingComponent } from './calendar/edit-booking/edit-booking.component';
import {HttpClientModule} from '@angular/common/http';
import {PrefectchRoomsService} from './prefectch-rooms.service';
import {PrefectchUsersService} from './prefectch-users.service';
import { LoginComponent } from './login/login.component';
import {AuthRouteGuardService} from './auth-route-guard.service';

const routes: Routes = [
  {path : 'admin/users', component : UsersComponent, canActivate : [AuthRouteGuardService]},
  {path : 'admin/rooms', component: RoomsComponent, canActivate : [AuthRouteGuardService]},
  {path : '', component: CalendarComponent},
  {path : 'editBooking', component: EditBookingComponent, resolve : {rooms : PrefectchRoomsService, users: PrefectchUsersService}, canActivate : [AuthRouteGuardService]},
  {path : 'addBooking', component: EditBookingComponent, resolve : {rooms : PrefectchRoomsService, users: PrefectchUsersService}, canActivate : [AuthRouteGuardService]},
  {path: 'login', component: LoginComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    RoomsComponent,
    UsersComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    EditBookingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
