import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListarComponent } from './post-listar/post-listar.component';
import { PostCriarComponent } from './post-criar/post-criar.component';
import { PostCategoriaListarComponent } from './post-categoria-listar/post-categoria-listar.component';
import { PostCategoriaCriarComponent } from './post-categoria-criar/post-categoria-criar.component';


const routes: Routes = [
  {
    path: 'post', component: PostListarComponent,
  },
  {
    path: 'post/:id', component: PostCriarComponent,
  },
  {
    path: 'novo-post', component: PostCriarComponent,
  },
  {
    path: 'post-categorias', component: PostCategoriaListarComponent
  },
  {
    path: 'post-categoria', component: PostCategoriaCriarComponent
  },
  {
    path: 'post-categoria/:id', component: PostCategoriaCriarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsPostsRoutingModule { }
