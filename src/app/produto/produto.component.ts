import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produto } from './produto';
import { tryParse } from 'selenium-webdriver/http';

@Component({
selector: 'app-produto',
templateUrl: './produto.component.html',
styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

dataSaved = false;
produtoForm: any;
allProdutos: Observable<Produto[]>;
produtoIdUpdate = null;
message = null;
displayedColumns = [];
dataSource: Observable<Produto[]>;
produtoslist: any[];
Modal = false;

constructor(private formbulider: FormBuilder, private produtoService: ProdutoService) { }

ngOnInit() {
this.produtoForm = this.formbulider.group({
ID_PRODUTO: null,
DESC_PRODUTO: ['', [Validators.required]],
EST_PRODUTO: ['', [Validators.required]],
VAL_PRODUTO: ['', [Validators.required]],
IMG_PRODUTO: null
});
this.loadAllProdutos();
this.produtoService.getAllProdutos().subscribe(item => {
 this.produtoslist = item;
});
}

loadAllProdutos() {
this.allProdutos = this.produtoService.getAllProdutos();
}




onFormSubmit() {
this.dataSaved = false;
const produto = this.produtoForm.value;
this.CreateProduto(produto);
this.produtoForm.reset();
}

CreateProduto(produto: Produto) {
if (this.produtoIdUpdate == null) {
this.produtoService.createProduto(produto).subscribe(
() => {
this.dataSaved = true;
this.message = 'Registro salvo com sucesso';
this.loadAllProdutos();
this.produtoIdUpdate = null;
this.produtoForm.reset();
}
);
} else {
produto.ID_PRODUTO = this.produtoIdUpdate;
this.produtoService.updateProduto(this.produtoIdUpdate, produto).subscribe(() => {
this.dataSaved = true;
this.message = 'Registro atualizado com sucesso';
this.loadAllProdutos();
this.produtoIdUpdate = null;
this.produtoForm.reset();
});
}
}

loadProdutoToEdit(ID_PRODUTO: number) {
this.produtoService.getProdutoById(ID_PRODUTO).subscribe(produto => {
this.message = null;
this.dataSaved = false;
this.produtoIdUpdate = produto.ID_PRODUTO;
this.produtoForm.controls.DESC_PRODUTO.setValue(produto.DESC_PRODUTO);
this.produtoForm.controls.EST_PRODUTO.setValue(produto.EST_PRODUTO);
this.produtoForm.controls.VAL_PRODUTO.setValue(produto.VAL_PRODUTO);
});
}

deleteProduto(ID_PRODUTO: number) {
if (confirm('Deseja realmente deletar este Produto ?')) {
this.produtoService.deleteProdutoById(ID_PRODUTO).subscribe(() => {
this.dataSaved = true;
this.message = 'Registro deletado com sucesso';
this.loadAllProdutos();
this.produtoIdUpdate = null;
this.produtoForm.reset();
});
}
}

resetForm() {
this.produtoForm.reset();
this.message = null;
this.dataSaved = false;
}
}


