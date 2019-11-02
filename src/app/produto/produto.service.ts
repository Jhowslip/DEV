import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
url = 'https://localhost:44387/api/Produtos';


getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url);
  }

getProdutoById(ID_PRODUTO: number): Observable<Produto> {
    const apiurl = `${this.url}/${ID_PRODUTO}`;
    return this.http.get<Produto>(apiurl);
  }

createProduto(DESC_PRODUTO: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, DESC_PRODUTO, this.httpOptions);
  }

updateProduto(ID_PRODUTO: string, DESC_PRODUTO: Produto): Observable<Produto> {
    const apiurl = `${this.url}/${ID_PRODUTO}`;
    return this.http.put<Produto>(apiurl, DESC_PRODUTO, this.httpOptions);
  }

deleteProdutoById(ID_PRODUTO: number): Observable<number> {
    const apiurl = `${this.url}/${ID_PRODUTO}`;
    return this.http.delete<number>(apiurl, this.httpOptions);
  }
}
