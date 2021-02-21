import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { MakeService } from 'src/services/make.service';
import { HttpClientModule } from '@angular/common/http';
import { FeatureService } from 'src/services/feature.service';
import { VEGA_API_URL } from './app-injections-tokens';
import { environment } from 'src/environments/environment';
import { ContactService } from 'src/services/contact.service';
import { VehicleService } from 'src/services/vehicle.service';
import { ToastyModule } from 'ng2-toasty';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './vehicle/view-vehicle/view-vehicle.component';
import { PhotoService } from 'src/services/photo.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehicleListComponent,
    ViewVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastyModule.forRoot()
  ],
  providers: [
    MakeService,
    FeatureService,
    ContactService,
    VehicleService,
    PhotoService,
    { provide: VEGA_API_URL, useValue: environment.vegaApi },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
