import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first } from 'rxjs';
import { CmsPostsService } from '../cms-posts.service';

@Component({
  selector: 'zwcms-post-categoria-criar',
  templateUrl: './post-categoria-criar.component.html',
  styleUrls: ['./post-categoria-criar.component.css']
})
export class PostCategoriaCriarComponent implements OnInit {

  form: FormGroup;
  isAddMode!: boolean;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private service: CmsPostsService,
    private formBuilder: FormBuilder,
    private msg: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iniciarForm(),

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;

    if(!this.isAddMode){
      this.service.findOneCategory(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x)
      })
    }
  }

  iniciarForm(){
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    for(const i in this.form.controls){
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    //if(this.form.invalid){
      //return;
    //}

    if(this.isAddMode){
      this.createData()
    }else{
      this.updateData()
    }
  }

  private createData(){
    this.service
      .saveCategory(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.msg.success('Registro salvo com sucesso!');
        this.voltar();
      })
  }

  private updateData(){
    this.service
      .updateCategory(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.msg.success('Registro salvo com sucesso!');
        this.voltar();
      })
  }

  voltar(){
    this.router.navigate(['/post-categorias'])
  }

}
