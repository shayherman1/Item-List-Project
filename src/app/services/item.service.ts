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
        contentType:'application/json'
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
    return this.http.put(baseurl,httpOptions,{responseType:'text'});

  }

  public addItem(item:Item){
    

    return this.http.post<any>('http://localhost:8080/items/addItem', item);
  }

  public deleteItem(itemNumber:number): Observable<Item>{
    return this.http.delete<any>('http://localhost:8080/items/deleItem/' + itemNumber);
  }
 

  public updateItem(item:Item): Observable<Item>{
    return this.http.put<Item>('http://localhost:8080/items/updateItem',item);
  }


}
