import { GetBidsResponseBidEntity } from "./get-bids-response-bid-entity"
import { Product } from "./product"

export class GetBidsResponse {

    product: Product = new Product()
    bids: GetBidsResponseBidEntity[] = []

}
