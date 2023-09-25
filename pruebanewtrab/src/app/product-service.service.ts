import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';


@Injectable()
export class ProductService {

    constructor(private http: HttpClient ) { }

    TodosProductos():Observable<any>{
        return this.http.get<any>("http://localhost:5121/api/Productos/ConsultarTodosProductos");
    } 

    ProductosById(id:number):Observable<any> {
        return this.http.get<any>(`http://localhost:5121/api/Productos/ConsultarProducto/${id}`)
    }

    AgregarProducto(produc:Product):Observable<any> {

        return this.http.post<any>("http://localhost:5121/api/Productos/InsertarProducto", produc);

    }

    DeleteProducto(id:number):Observable<any> {
        return this.http.delete(`http://localhost:5121/api/Productos/EliminarProducto/${id}`)
    }

    UpdateProducto(id:number,produc:Product):Observable<any> {
        return this.http.put("http://localhost:5121/api/Productos/EditarProducto/"+ id, produc);
    }
    

}