import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositItemComponent } from './components/deposit-item/deposit-item.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { WithdrawItemComponent } from './components/withdraw-item/withdraw-item.component';


const routes: Routes = [

  { path: 'all',component: AllItemsComponent },
  { path: 'deposit',component: DepositItemComponent },
  { path: 'withdraw',component: WithdrawItemComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routhingComponents =  [AllItemsComponent,DepositItemComponent,WithdrawItemComponent];

