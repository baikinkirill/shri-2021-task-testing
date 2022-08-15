import {ExampleApi, LOCAL_STORAGE_CART_KEY} from "../../../src/client/api";
import axios, {AxiosResponse} from "axios";
import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../../../src/common/types";
import {mockData} from "./mockData";

export class customApi extends ExampleApi {
 public isError = false;
 public params = {
	except:false
 }
 constructor(basename: string, params: any) {
	super(basename);

	if(params){
	 this.params = {...this.params, ...params};
	}
 }

 async getProducts() {


	if(this.params.except){
	 this.isError = true;
	 throw("API is not allowed");
	 return undefined
	}

	return {
	 data: mockData
	} as any as AxiosResponse<ProductShortInfo[]>
 }

 async getProductById(id: number) {

	if(this.params.except){
	 this.isError = true;
	 throw("API is not allowed");
	}

	return {
	 data: mockData[id]
	} as any as AxiosResponse<Product>
 }

 async checkout(form: CheckoutFormData, cart: CartState) {

	if(this.params.except){
	 this.isError = true;
	 throw("API is not allowed");
	}

	return {
	 data: {
		id: 1
	 }
	} as any as Promise<AxiosResponse<CheckoutResponse>>
 }
}

export class customCartApi {
 getState(): CartState {
	try {
	 const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
	 return JSON.parse(json) as CartState || {};
	} catch {
	 return {};
	}
 }

 setState(cart: CartState) {
	localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
 }
}
