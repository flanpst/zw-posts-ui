import { Component, OnInit } from '@angular/core';
import { CmsPostsCategorias } from '../class/cms-posts-categorias';
import { Router } from '@angular/router';
import { CmsPostsService } from '../cms-posts.service';

@Component({
  selector: 'zwcms-post-categoria-listar',
  templateUrl: './post-categoria-listar.component.html',
  styleUrls: ['./post-categoria-listar.component.css']
})
export class PostCategoriaListarComponent implements OnInit {

  data: CmsPostsCategorias[]
  totalItens: number;
  per_page: number;

  constructor(
    private router: Router,
    private service: CmsPostsService
  ) { }

  ngOnInit(): void {
    this.listarCategorias()
  }

  novaCategoria(){
    this.router.navigate(['post-categoria'])
  }

  listarCategorias(){
    this.service
      .findAllCategory()
      .subscribe(resp => {
        this.data = resp['data']
        this.totalItens = resp['total']
        this.per_page = resp['per_page']
      })
  }

  onPageIndexChange(e){
    this.service
      .getPageCategory(e)
      .subscribe(resp => {
        console.log(e)
        this.data = resp['data']
      })
  }

}
