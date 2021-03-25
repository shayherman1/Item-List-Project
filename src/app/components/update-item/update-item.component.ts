import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  items:Item[];
  item:Item;
  updateItemForm:FormGroup;

  constructor(private dialogRef:MatDialogRef<UpdateItemComponent>, @Inject(MAT_DIALOG_DATA) data:any,private service:ItemService,
  private fb:FormBuilder) { 
    this.item = data.itm;
  }

  ngOnInit(): void {
   this.updateItemForm = this.fb.group({
    
     name: ['',Validators.required],
     amount: ['',Validators.required],
     inventoryCode: ['',Validators.required],

   });


  }



public updateItem(){
  let itm:Item = new Item(
    this.item.itemNumber,
    this.updateItemForm.controls['name'].value,
    this.updateItemForm.controls['amount'].value,
    this.updateItemForm.controls['inventoryCode'].value
  );
  this.service.updateItem(itm).subscribe(
    (res:any)=>{
      this.dialogRef.close(res);
    }, (err)=>{
      alert(err.error);
    }
  );
}

public cancel(){
  this.dialogRef.close();
}




}
