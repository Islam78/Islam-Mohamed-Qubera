import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() childToParent = new EventEmitter<String>();
  SearchValue: any

  constructor() {
  }
  // make search and send it to header component then order component
  sendToParent() {
    this.childToParent.emit(this.SearchValue);
  }
  // clear search bar
  ClearSearch() {
    this.SearchValue = ''
    this.sendToParent()
  }

}
