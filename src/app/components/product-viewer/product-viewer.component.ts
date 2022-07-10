import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.css']
})
export class ProductViewerComponent implements OnInit {

  @Output() selectedProductEvent = new EventEmitter<string>();

  products: Product[] = []
  selectedProduct: Product = new Product()

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      res.forEach(d => {
        // Using builder pattern to compose model for UI
        this.products.push(
          Builder<Product>()
            .id(d.id)
            .name(d.name)
            .shortDescription(d.shortDescription)
            .detailedDescription(d.detailedDescription)
            .category(d.category)
            .startingPrice(d.startingPrice)
            .bidEndDateFormatted(formatDate(d.bidEndDate, 'medium', 'en-US'))
            .build()
        )
      })
    });
  }

  selectedProductEmit() {
    this.selectedProductEvent.emit(this.selectedProduct.id)
  }
}
