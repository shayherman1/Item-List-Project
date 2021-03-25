import { Component, OnInit, Inject } from '@angular/core';
import { Item } from 'src/app/model/item';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { InventoryCode } from 'src/app/model/inventory-code.enum';

@Component({
  selector: 'app-withdraw-item',
  templateUrl: './withdraw-item.component.html',
  styleUrls: ['./withdraw-item.component.css']
})
export class WithdrawItemComponent implements OnInit {
  message: string;
  item: Item;
  amount:number;
  itemNumber:number;
  inventoryCode:InventoryCode;
  items:Item[];
  withdrawItemForm: FormGroup;
  
 
  constructor(private dialogRef: MatDialogRef<WithdrawItemComponent>,
    @Inject(MAT_DIALOG_DATA) data:any, private service: ItemService,
    private fb: FormBuilder) { 
      this.item = data; 
      console.log(this.item);
      console.log(data);
    }

  ngOnInit(): void {
    
    this.withdrawItemForm = this.fb.group({
    
      itemNumber: ['', [Validators.required]],
      amount: ['', [Validators.required]]
      
      
      
    });


    
  }
  

  public withdrawItem() {
    let itm: Item = new Item(
      this.item.itemNumber,
      this.item.name,
      this.withdrawItemForm.controls['amount'].value,
      this.item.inventoryCode,
    );

    this
    console.log(itm);
    console.log(this.item);
    this.service.withdrawItem(this.item.itemNumber,this.withdrawItemForm.controls['amount'].value).subscribe(
      (res:any) => {
        console.log(this.item.itemNumber)
        this.items = res;
        this.dialogRef.close(res);
      }, (err) => {
        alert(err.error);
        

      }

    );
  }

  public cancel(){
    this.dialogRef.close();
  }

  
}