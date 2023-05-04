import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { CmsPostsCategoriasService } from '../cms-posts-categorias.service';
import { CmsPostsService } from '../cms-posts.service';
import { Observable, Observer, first } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CmsPostsCategorias } from '../class/cms-posts-categorias';

@Component({
  selector: 'zwcms-post-criar',
  templateUrl: './post-criar.component.html',
  styleUrls: ['./post-criar.component.css']
})
export class PostCriarComponent implements OnInit {

  loading = false;
  avatarUrl?: string;
  bannerUrl?: string;
  isAddMode!: boolean;
  id!: number;
  categorias: CmsPostsCategorias[] = [];
  currentUser: any
  tokenUser: any;
  imagemDestaque: string;
  bannerDestaque: string;

  tags = [];
  inputVisible = false;
  inputValue = '';
  inputControl = new FormControl();

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  post_status = [
    {value: '0', label: 'Público'},
    {value: '1', label: 'Rascunho'},
    {value: '2', label: 'Privado'}
  ]

  form: FormGroup;
  UPLOAD_FILE = `${this.environment.server_url}` + '/post/images'

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image']
    ]
  };

  constructor(
    @Inject('env') protected environment,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private service: CmsPostsService,
    private authService: AuthenticationService,
    private categoriaService: CmsPostsCategoriasService
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarCategorias();

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;

    if(!this.isAddMode){
      this.service.findOne(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x)
          this.avatarUrl = `${this.environment.thumb_url}` + '/post/images/' + x.image
          this.bannerUrl = `${this.environment.thumb_url}` + '/post/images/' + x.banner

          const tagsList = x['meta_tags'].split(',').map(tag => `${tag.trim()}`); // Divide a lista de tags em um array e adiciona as aspas duplas em cada tag
          this.tags = tagsList

          this.imagemDestaque = x.image
          this.bannerDestaque = x.banner
      })
    }
  }

  iniciarFormulario(){
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl(''),
      resume: new FormControl(''),
      post_category_id: new FormControl('', [Validators.required]),
      post_status: new FormControl('', [Validators.required]),
      meta_title: new FormControl(''),
      meta_description: new FormControl(''),
      meta_tags: new FormControl(''),
      image: new FormControl(''),
      banner: new FormControl(''),
      publication_date: new FormControl(''),
      user_id: new FormControl('')
    })
  }

  listarCategorias(){
    this.categoriaService
      .getList()
      .subscribe(resp => {
        this.categorias = resp;
      })
  }


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  getFileUrl(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.imagemDestaque = info.file!.originFileObj!['name']
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Erro ao enviar');
        this.loading = false;
        break;
    }
  }

  getFileUrlBanner(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.bannerDestaque = info.file!.originFileObj!['name']
          this.loading = false;
          this.bannerUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Erro ao enviar');
        this.loading = false;
        break;
    }
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  setMediaUploadHeaders = (file: NzUploadFile) => {

    const tokenUser = localStorage.getItem('token');

    return {
      "authorization": 'Bearer ' + tokenUser
    }
  };

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
    this.form.patchValue({
      image: this.imagemDestaque,
      banner: this.bannerDestaque,
      meta_tags: this.tags
    })
    this.service
      .save(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.msg.success('Registro salvo com sucesso!');
        this.voltar();
      })
  }

  private updateData(){
    this.form.patchValue({
      image: this.imagemDestaque,
      banner: this.bannerDestaque,
      meta_tags: this.tags
    })
    this.service
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.msg.success('Registro salvo com sucesso!');
        this.voltar();
      })
  }

  voltar(){
    this.router.navigate(['/post'])
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputControl.value && this.tags.indexOf(this.inputControl.value) === -1) {
      this.tags = [...this.tags, this.inputControl.value];
    }
    this.inputControl.reset();
    this.inputVisible = false;
  }
}
