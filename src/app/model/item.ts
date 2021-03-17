import { from } from "rxjs";
import { InventoryCode } from "./inventory-code.enum";

export class Item {
    constructor(
        public itemNumber: number,
        public name: string,
        public amount: number,
        public inventoryCode: InventoryCode
        ){}
}
