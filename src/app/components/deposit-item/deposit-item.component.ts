import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-deposit-item',
  templateUrl: './deposit-item.component.html',
  styleUrls: ['./deposit-item.component.css']
})
export class DepositItemComponent implements OnInit {

  item: Item;
  items:Item[];
  depositItemForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<DepositItemComponent>,
    @Inject(MAT_DIALOG_DATA) data:any, private service: ItemService,
    private fb: FormBuilder) { this.item = data.itm; }

  ngOnInit(): void {
    this.depositItemForm = this.fb.group({ 
      amount: ['',[Validators.required]],
      
    })
  }


  public depositItem(){
    let itm: Item = new Item(
      this.item.itemNumber,
      this.item.name,
      this.depositItemForm.controls['amount'].value,
      this.item.inventoryCode,
    );
    this.service.depositItem(this.depositItemForm.controls['amount'].value,this.item.itemNumber).subscribe(
      (res:any) => {
        
        this.dialogRef.close(res);
      }, (err:any) => {
        alert(err.error);
        

      }

    );
  }
  public cancel(){
    this.dialogRef.close();
  }

}
