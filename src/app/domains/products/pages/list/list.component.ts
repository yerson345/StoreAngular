import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component'
import { Product } from '@shared/models/product.model'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {

  products = signal<Product[]>([])
  categories = signal<Category[]>([])
  //ACCION DE DEPENDENCIAS
  private cartService = inject(CartService)
  private categoryService = inject(CategoryService)
  private productService = inject(ProductService)
  @Input() category_id?: string


  ngOnInit() {
    this.getCategory();
    // this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    // const category_id = changes['category_id'];
    this.getProducts();
    // if (category_id) {
    //   this.getProducts()
    // }
  }


  addToCart(product: Product) {
    console.log('Estamos en el padre')
    console.log(product)
    this.cartService.addToCart(product)
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
      .subscribe({
        next: (products) => {
          console.log('Productos recibidos:', products);
          this.products.set(products)
        },
        error: () => {
          console.log('Error al cargar products')
        }
      })
  }

  private getCategory() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          console.log('Productos recibidos:', data);
          this.categories.set(data)
        },
        error: () => {
          console.log('Error al cargar categories')
        }
      })
  }

}
