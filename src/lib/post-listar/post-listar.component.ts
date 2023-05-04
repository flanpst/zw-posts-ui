import { Component, OnInit } from '@angular/core';
import { CmsPosts } from '../class/cms-posts';
import { Router } from '@angular/router';
import { CmsPostsService } from '../cms-posts.service';

@Component({
  selector: 'zwcms-post-listar',
  templateUrl: './post-listar.component.html',
  styleUrls: ['./post-listar.component.css']
})
export class PostListarComponent implements OnInit {

  data: CmsPosts[] = []
  totalItens: number;
  per_page: number;

  constructor(
    private router: Router,
    private service: CmsPostsService
  ) { }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.service
      .findAll()
      .subscribe(resp => {
        this.data = resp['data']
        this.totalItens = resp['total']
        this.per_page = resp['per_page']
      })
  }

  editar(id){
    this.router.navigate(['post/' + id])
  }

  novoPost(){
    this.router.navigate(['novo-post'])
  }

}
