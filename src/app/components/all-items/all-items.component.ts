import { Component, OnInit } from '@angular/core';
import { InventoryCode } from 'src/app/model/inventory-code.enum';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {



  constructor(private service:ItemService) { }

  ngOnInit(): void {
    
  }

  

}
