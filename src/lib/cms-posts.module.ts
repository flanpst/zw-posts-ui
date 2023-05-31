import { InjectionToken, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { PostCriarComponent } from './post-criar/post-criar.component';
import { PostListarComponent } from './post-listar/post-listar.component';
import { PostCategoriaCriarComponent } from './post-categoria-criar/post-categoria-criar.component';
import { PostCategoriaListarComponent } from './post-categoria-listar/post-categoria-listar.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CommonModule, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { CmsPostsService } from './cms-posts.service';
import { CmsPostsRoutingModule } from './cms-posts-routing.module';
import { CmsPostsCategoriasService } from './cms-posts-categorias.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TagInputModule } from 'ngx-chips';
import { NzTableModule } from 'ng-zorro-antd/table';
import { env } from './cms-posts-configuration';

export const ENVIRONMENT = new InjectionToken<env>('env');

const antdModule = [
  NzCardModule,
  NzButtonModule,
  NzRadioModule,
  NzFormModule,
  NzSwitchModule,
  NzUploadModule,
  NzInputModule,
  NzSelectModule,
  NzMessageModule,
  NzDatePickerModule,
  NzTableModule,
  NzTagModule
]

@NgModule({
  declarations: [
    PostCriarComponent,
    PostListarComponent,
    PostCategoriaCriarComponent,
    PostCategoriaListarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzIconModule,
    TagInputModule,
    CmsPostsRoutingModule,
    ...antdModule
  ],
  exports: [
    PostCategoriaCriarComponent,
    PostCategoriaListarComponent,
    PostCriarComponent,
    PostListarComponent
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: pt_BR,
    },
    {
        provide: LOCALE_ID,
        useValue: 'pt'
    },
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy
    },
  ]
})
export class CmsPostsModule {
  static forRoot(environment?: env): ModuleWithProviders<CmsPostsModule> {

    return {
        ngModule: CmsPostsModule,
        providers: [
            CmsPostsService,
            CmsPostsCategoriasService,
            {
                provide: ENVIRONMENT, // you can also use InjectionToken
                useValue: environment
            }
        ]
    };
  }
}
