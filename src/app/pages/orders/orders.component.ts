import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_modules/category.model';
import { ItemModel } from '../_modules/item.model';
import { GetProductsService } from '../_services/get-products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // in Genral
  ProductsItem: ItemModel[];
  category: Category[];
  gategoryFillter: any;
  fillterValue: string;

  // pagination
  current = 1;
  items: string[]
  itemsToDisplay: string[] = [];
  perPage: number = 6;
  ProductFound: number = 6
  total: number;

  constructor(private productSer: GetProductsService, private route: Router) { }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategory()
    this.itemsToDisplay = this.paginate(this.current, this.perPage);

  }

  // all product
  getAllProducts() {
    this.productSer.getAllProduct(this.perPage).then(data => {
      if (data) {
        this.setNewProducts(data)
      }
    })
      .catch(err => console.log(err))
  }

  // get Custom product 
  getProductPages(Pagenum: number, limit: number) {
    this.productSer.getPaginationProduct(Pagenum, limit).then(data => {
      if (data) {
        this.setNewProducts(data)
      }
    })
      .catch(err => console.log(err))
  }

  // filter With search value
  fillterProduct(SearchValue: any) {
    this.fillterValue = SearchValue
    console.log('ProductFound' + this.ProductFound);
    
    this.productSer.SearchProduct(SearchValue, this.ProductFound).then(data => {
      if (data) {
        this.setNewProducts(data)
      }
    })
      .catch(err => console.log(err))
  }

  // get cat
  getAllCategory() {
    this.productSer.getAllProductOfCategory().then(data => {
      if (data) {
        this.category = data
      }
    })
      .catch(err => console.log(err))
  }

  // Filter item Category
  FillterWithCategory(category: any) {
    this.productSer.FillterProductOfCategory(category).then(data => {
      if (data) {
        this.setNewProducts(data)
      }
    })
      .catch(err => console.log(err))
  }

  // Custom pagination
  setNewProducts(data: any) {
    this.ProductsItem = data.products
    this.ProductFound = data.limit
    this.items = [...Array(data.total).keys()].map((x) => `item ${++x}`);
    this.total = Math.ceil(this.items.length / this.perPage);
  }

  // direct go to custom page
  onGoTo(page: number): void {
    this.current = page;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.getProductPages(this.current, this.itemsToDisplay.length)
  }

  // btn next
  onNext(page: number): void {
    this.current = page + 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    console.log('current', this.current);
    console.log('itemsToDisplay', this.itemsToDisplay);
    this.getProductPages(this.current, this.itemsToDisplay.length)

  }

  // btn left previous
  onPrevious(page: number): void {
    this.current = page - 1;
    this.itemsToDisplay = this.paginate(this.current, this.perPage);
    this.getProductPages(this.current, this.itemsToDisplay.length)
  }
  
  // calc pagination
  paginate(current: number, perPage: number): string[] {
    if (this.items) {
      console.log('current', current);
      console.log('perPage', perPage);
      return [...this.items?.slice((current - 1) * perPage).slice(0, perPage)]
    }
    return []
  }

}
