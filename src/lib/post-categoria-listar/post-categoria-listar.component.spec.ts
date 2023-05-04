import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoriaListarComponent } from './post-categoria-listar.component';

describe('PostCategoriaListarComponent', () => {
  let component: PostCategoriaListarComponent;
  let fixture: ComponentFixture<PostCategoriaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCategoriaListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategoriaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
