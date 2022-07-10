import { Component } from '@angular/core';
import { GetBidsResponseBidEntity } from 'src/app/models/get-bids-response-bid-entity';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bid-viewer',
  templateUrl: './bid-viewer.component.html',
  styleUrls: ['./bid-viewer.component.css']
})
export class BidViewerComponent {

  bids: GetBidsResponseBidEntity[] = []

  constructor(public productService: ProductService) { }

  getBidsOnProduct(selectedProductId: string) : GetBidsResponseBidEntity[] {
    var returnValue : GetBidsResponseBidEntity[] = []
    this.productService.getBidsOnProduct(selectedProductId).subscribe((res) => {
      returnValue = this.bids = res.bids
    }, (err) => {
      console.error(err)
      alert('Error while retrieving bids for selected product')
    })
    return returnValue
  }
}
