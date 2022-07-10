import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GetBidsResponse } from 'src/app/models/get-bids-response';
import { GetBidsResponseBidEntity } from 'src/app/models/get-bids-response-bid-entity';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { of, throwError } from 'rxjs';
import { BidViewerComponent } from './bid-viewer.component';

describe('BidViewerComponent', () => {
  let component: BidViewerComponent;
  let fixture: ComponentFixture<BidViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidViewerComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of bids', () => {

    let mockBidsResponse : GetBidsResponse = new GetBidsResponse()
    mockBidsResponse.bids.push(new GetBidsResponseBidEntity())

    let service = fixture.debugElement.injector.get(ProductService)
    spyOn(service, 'getBidsOnProduct').and.returnValue(of(mockBidsResponse))

    component.getBidsOnProduct('1')
    expect(component.bids.length).toBeGreaterThan(0)
  });

  it('should not set bids on service failure', () => {

    let service = fixture.debugElement.injector.get(ProductService)
    spyOn(service, 'getBidsOnProduct').and.returnValue(throwError('service failure'))

    component.getBidsOnProduct('1')
    expect(component.bids.length).toBe(0)
  });

});
