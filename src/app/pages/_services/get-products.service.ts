import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../_modules/item.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  itemModel: ItemModel
  constructor(private http: HttpClient,) { }

  getAllProduct(perPage: number): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + `products/?limit=${perPage}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  getSingleProduct(itemId: number): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + `products/${itemId}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  SearchProduct(SearchValue: number, limit: number): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + `products/search?q=${SearchValue}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  getPaginationProduct(Pagenum: number, limit: number): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + `products/?limit=${limit}&skip=${Pagenum}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  getAllProductOfCategory(): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + 'products/categories')
      .toPromise()
      .catch(err => {
        return err;
      });
  }

  FillterProductOfCategory(Fillter: any): Promise<any> {
    return this.http.get(environment['apiBaseUrl'] + `products/category/${Fillter}`)
      .toPromise()
      .catch(err => {
        return err;
      });
  }

}
