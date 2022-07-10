import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Builder } from 'builder-pattern';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { ProductViewerComponent } from './product-viewer.component';

describe('ProductViewerComponent', () => {
  let component: ProductViewerComponent;
  let fixture: ComponentFixture<ProductViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewerComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of products on page load', () => {

    let product : Product = Builder<Product>()
    .id('123')
    .name('product')
    .shortDescription('product')
    .detailedDescription('product')
    .category('category')
    .startingPrice(123)
    .bidEndDate(new Date())
    .build()

    let service = fixture.debugElement.injector.get(ProductService)
    spyOn(service, 'getProducts').and.returnValue(of([product]))
    component.ngOnInit()
    expect(service.getProducts).toHaveBeenCalled()
    expect(component.products.length).toBe(1)
  });

  it('should have empty list of products on service failure', () => {
    let service = fixture.debugElement.injector.get(ProductService)
    spyOn(service, 'getProducts').and.returnValue(throwError('service failure'))
    component.ngOnInit()
    expect(service.getProducts).toHaveBeenCalled()
    expect(component.products.length).toBe(0)
  });

  it('should emit selected product event if called', () => {
    const emitSpy = spyOn(component.selectedProductEvent, 'emit')
    component.selectedProductEmit()
    expect(emitSpy).toHaveBeenCalled()
  });

});
