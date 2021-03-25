import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Item } from '../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

   itemNumber:number;
    
  constructor(private http: HttpClient) { }



  public getItemDetails(itemNumber:number): Observable<Item>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      })
    };
  
    const baseurl = 'http://localhost:8080/items/getItemDetails/' + itemNumber ;
    return this.http.get<Item>(baseurl,httpOptions)
  }

  public getItems() {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json'
      })
    };
    const baseurl = 'http://localhost:8080/items/getItems'
    return this.http.get<Item[]>(baseurl,httpOptions);
  }

  public withdrawItem(itemNumber:number,amount:number){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'contentType':'application/json'
      })
    };
    console.log( amount);
    const baseurl = 'http://localhost:8080/items/withdraw/' + itemNumber  + '/' + amount ;
    return this.http.put(baseurl,httpOptions,{responseType:'text'});
    

  }
  public depositItem(itemNumber:number,amount:number){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
      })
    };
    console.log( amount);
    const baseurl = 'http://localhost:8080/items/deposit/' +  itemNumber + '/' + amount ;
    return this.http.put(baseurl,httpOptions);

  }

  public addItem(item: Item){
    const httpOptions = new HttpHeaders({ 
        'Content-Type': 'application/json',
        "Accept": "*/*",
        
      })
    

    return this.http.post<Item>('http://localhost:8080/items/addItem', item, {headers: httpOptions} );
  }

  public deleteItem(itemNumber:number): Observable<Item>{
    return this.http.delete<any>('http://localhost:8080/items/deleItem/' + itemNumber);
  }
 

  public updateItem(item:Item){
    const httpOptions = new HttpHeaders({ 
      'Content-Type': 'application/json',
      "Accept": "*/*",
      
    })
    return this.http.put<Item>('http://localhost:8080/items/updateItem', item, {headers: httpOptions} );
  }


}
