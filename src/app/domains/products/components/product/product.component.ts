import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {
    //SE ENVIA INFORMACION DE PADRE A HIJO
  @Input({required : true}) product!: Product;
  // @Input({required : true}) price: number = 0;

  //SE ENVIA INFORMACION DE HIJO A PADRE
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('click form child');
    this.addToCart.emit(this.product);
  }
}
