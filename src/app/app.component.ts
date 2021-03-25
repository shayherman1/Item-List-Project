import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEventPattern, Observable } from 'rxjs';
import { DepositItemComponent } from './components/deposit-item/deposit-item.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { WithdrawItemComponent } from './components/withdraw-item/withdraw-item.component';
import { InventoryCode } from './model/inventory-code.enum';
import { Item } from './model/item';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'item-list';
  itemNumber:number;
  
  isPopUpOpened = true;
  _itemForm: FormGroup;
  items: Item[];
  items2: Item
  item: Item;
  idControl:FormControl;
  amountControl:FormControl;


constructor(private service:ItemService,private dialog:MatDialog,private _fb:FormBuilder){
}

ngOnInit(): void {
  this.getItems();
  this.idControl = new FormControl('',Validators.required);
  this.amountControl = new FormControl('',Validators.required);

  this._itemForm = this._fb.group({
    name: ["",[Validators.required]],
    amount:["",[Validators.required]],
    inventoryCode:["",Validators.required],
  });
  
    
}
get name() {
  return this._itemForm.controls['name'];
}

get amount() {
 return this._itemForm.controls['amount'];
}

get inventorycode() {
  return this._itemForm.controls['inventoryCode'];

}


formReset(form: FormGroup){
  form.reset();
  Object.keys(form.controls).forEach(key =>{
    form.get(key)?.setErrors(null);
  })
}


public getItems(){
this.service.getItems().subscribe((itms:Item[])=>{
 this.items = itms;
 console.log(itms);
  },(err)=>{
    console.log("Error");
  })
}

public getItemDetails(){
 if(this.idControl.invalid)
 return;
 this.service.getItemDetails(this.idControl.value).subscribe((item)=>{
   this.items = new Array();
   let newArray = this.items.push(item);
   console.log(newArray);
 }, (err)=>{
   alert(err.error);
   
 })

  }
  
  onSubmit(){
    const newUser: Item = new Item(
      0,
      this._itemForm.value.name,
      this._itemForm.value.amount,
      this._itemForm.value.inventoryCode
    ) 
    
    this.service.addItem(newUser).subscribe(
      (add:any)=>{
        this.items=add;
        // this.items.push(add);
         
        
        this.formReset(this._itemForm);
      }
      )
  
  // console.log(newUser);
}

// onAdd(){
//   let newItem:Item = new Item(0,
//     this._itemForm.controls['name'].value,
//     this._itemForm.controls['amount'].value,
//     this._itemForm.controls['inventoryCode'].value)
//     this.service.addItem(newItem).subscribe(
//       (add: Item)=>{
//         let res = add;
//         console.log(res);
//         // this.items.splice(0, 0, res);
        
//         this.formReset(this._itemForm);
//       },(err)=>{
//         alert(err.error);
//       }
//       )
//     }


public deleteItem(itemNumber: number){
  this.service.deleteItem(itemNumber).subscribe((dele:any)=>{
    this.items = dele;
  }, (err)=>{
    alert(err.error);
  }
  )
}

public withdraw(itemNumber:number,amount:number){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus = true;
  dialogConfig.data = {
    itmNum:itemNumber,
    amt: this.amountControl.value,
  };

  const dialogRef = this.dialog.open(WithdrawItemComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    (data)=>{
      if(data== undefined)
      return;
      this.items = data;
    }
  )
}


public deposit(itemNumber:number,amount:number){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus = true;
  dialogConfig.data = {
    itmNum:itemNumber,
    amt: amount
  };

  const dialogRef = this.dialog.open(DepositItemComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    (data)=>{
      if(data== undefined)
      return;
      this.items = data;
    }
  )
}


public editItem(item:Item){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.restoreFocus = true;
  dialogConfig.data = {
    itm: item
  };

  const dialogRef = this.dialog.open(UpdateItemComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
    (data)=>{
      if(data== undefined)
      return;
      this.items = data;
    }
  )
  }
}