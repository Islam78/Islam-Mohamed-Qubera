import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    SearchComponent,
    HeaderComponent,
    PaginationComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [SearchComponent, HeaderComponent, PaginationComponent, FooterComponent]
})
export class SharedModule { }
