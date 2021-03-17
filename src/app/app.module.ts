import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule , routhingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { DepositItemComponent } from './components/deposit-item/deposit-item.component';
import { WithdrawItemComponent } from './components/withdraw-item/withdraw-item.component';





@NgModule({
  declarations: [
    AppComponent,
    routhingComponents,
    UpdateItemComponent,
    DepositItemComponent,
    WithdrawItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

