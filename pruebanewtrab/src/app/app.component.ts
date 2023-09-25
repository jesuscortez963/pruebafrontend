import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public products: Product[] = [];

  idEditarProduct: any;

  miFormulario: FormGroup;

  productDialog: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.miFormulario = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      description: [''],
      precio: [''],
      existencia: [''],
      tipoProducto: [''],
    });
  }

  ngOnInit() {
    this.llenarTabla();
  }

  llenarTabla() {
    this.productService.TodosProductos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.products = resp;

      },
    });
  }

  editProduct(products: any) {

    this.idEditarProduct = products['id'];


    this.miFormulario.patchValue({
      nombreProducto: products.nombreProducto,
      description: products.descripcionProducto,
      precio: products.precio,
      existencia: products.existencia,
      tipoProducto: products.tipoProductoId,
    });

    this.productDialog = true;
  }

  deleteProduct(products: any) {
    this.productService.DeleteProducto(products['id']).subscribe({
      next: (resp) => {
        this.llenarTabla();
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
  }

  saveOeditProduct() {


    if(this.idEditarProduct != undefined) {
        let datosEditProduct: Product = {
            nombreProducto: this.miFormulario.get('nombreProducto')?.value,
            descripcionProducto: this.miFormulario.get('description')?.value,
            precio: this.miFormulario.get('precio')?.value,
            existencia: this.miFormulario.get('existencia')?.value,
            tipoProductoId: this.miFormulario.get('tipoProducto')?.value,
          };
      
          this.productService
            .UpdateProducto(this.idEditarProduct, datosEditProduct)
            .subscribe({
              next: (resp) => {
      
                this.llenarTabla();
                 
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto actualizado',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.productDialog = false;

              },
            });
    } else {
        this.nuevoProduct();
    }

    
  }

  nuevoProduct() {
    this.productDialog = true;


    if(this.miFormulario.valid){
        let nuevoProduct = {
            nombreProducto: this.miFormulario.get('nombreProducto')?.value,
            descripcionProducto: this.miFormulario.get('description')?.value,
            precio: this.miFormulario.get('precio')?.value,
            existencia: this.miFormulario.get('existencia')?.value,
            tipoProductoId: this.miFormulario.get('tipoProducto')?.value
        }
    
        this.productService
        .AgregarProducto(nuevoProduct)
        .subscribe({
          next: (resp) => {
    
            this.llenarTabla();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto insertado',
                showConfirmButton: false,
                timer: 1500
              })
            this.productDialog = false;

          },
        });
    }

    

  }
}
