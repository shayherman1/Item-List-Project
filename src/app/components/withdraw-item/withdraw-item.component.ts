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
    private fb: FormBuilder) { this.item = data.itm; }

  ngOnInit(): void {
    
    this.withdrawItemForm = this.fb.group({


      itemNumber: ['',Validators.required],
      name: ['',Validators.required],
      amount: ['', [Validators.required]],
      inventoryCode:['',Validators.required]
      
      
    });


    
  }
  

  public withdrawItem() {
    let itm: Item = new Item(
      this.withdrawItemForm.controls['itemNumber'].value,
      this.withdrawItemForm.controls['name'].value,
      this.withdrawItemForm.controls['amount'].value,
      this.withdrawItemForm.controls['inventoryCode'].value,
    );
    console.log(itm);
    console.log(this.item);
    this.service.withdrawItem(this.withdrawItemForm.controls['amount'].value,this.withdrawItemForm.controls['itemNumber'].value).subscribe(
      (res:any) => {
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