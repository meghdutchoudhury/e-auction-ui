import { Seller } from "./seller";

export class Product {
    id: string = ""
    name: string = ""
    shortDescription: string = ""
    detailedDescription: string = ""
    category: string = ""
    startingPrice: number = 0
    bidEndDate: Date = new Date()
    bidEndDateFormatted: string = ""
    email: string = ""
    seller: Seller = new Seller()
}