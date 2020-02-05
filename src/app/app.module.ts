import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AlertifyService } from './_services/alertify.service';

import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { MakeEditResolver } from './_resolvers/make.edit.resolver';
import { MakeListResolver } from './_resolvers/make.list.resolver';
import { VehicleMakeService } from './_services/vehicle-make.service';
import { MakeDetailsComponent } from './vehicle-make/make-details/make-details.component';
import { MakeEditComponent } from './vehicle-make/make-edit/make-edit.component';
import { MakeListComponent } from './vehicle-make/make-list/make-list.component';
import { MakeCreateComponent } from './vehicle-make/make-create/make-create.component';
import { ModelDetailsComponent } from './vehicle-model/model-details/model-details.component';
import { ModelEditComponent } from './vehicle-model/model-edit/model-edit.component';
import { ModelCreateComponent } from './vehicle-model/model-create/model-create.component';
import { ModelListComponent } from './vehicle-model/model-list/model-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakerCardComponent } from './vehicle-make/maker-card/maker-card.component';
import {  ModelCreateResolver } from './_resolvers/model.create.resolver';
import { ModelEditResolver } from './_resolvers/model.edit.resolver';
import { ModelListResolver } from './_resolvers/model.list.resolver';
import { ModelCardComponent } from './vehicle-model/model-card/model-card.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,

      MakeDetailsComponent,
      MakeEditComponent,
      MakeListComponent,
      MakeCreateComponent,
      MakerCardComponent,

      ModelDetailsComponent,
      ModelEditComponent,
      ModelListComponent,
      ModelCreateComponent,
      ModelCardComponent


   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
   ],
   providers: [

      AlertifyService,

      VehicleMakeService,
      MakeEditResolver,
      MakeListResolver,

      ModelCreateResolver,
      ModelEditResolver,
      ModelListResolver


   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
