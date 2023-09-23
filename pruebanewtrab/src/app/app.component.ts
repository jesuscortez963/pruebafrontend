import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;
  

  selectedProducts: Product[] = [];

  submitted!: boolean;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.productService.getProducts().then(data => {
        console.log(data)
        this.products = data;

      });
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }



  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
    console.log(product)
  
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;

          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
