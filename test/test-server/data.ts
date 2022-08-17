import { Order, Product, ProductShortInfo } from '../../src/common/types';
import {mockData} from "../unit/utils/mockData";

function getShortInfo({ id, name, price }: Product): ProductShortInfo {
    return { id, name, price };
}

export const SIZE = 200;

export class ExampleStore {
    private readonly products: Product[] = mockData;
    private readonly orders: (Order | { id: number })[] = [];

    getAllProducts(): ProductShortInfo[] {
        return this.products.map(getShortInfo);
    }

    getProductById(id: number): Product | undefined {
        const [product] = this.products.filter(p => p.id === id);
        return product;
    }

    createOrder(order: Order): number {
        const id = this.orders.length + 1;
        this.orders.push({ id, ...order });
        return id;
    }

    getLatestOrders() {
        return this.orders.slice(-SIZE);
    }
}
