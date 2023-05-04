import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategoriaCriarComponent } from './post-categoria-criar.component';

describe('PostCategoriaCriarComponent', () => {
  let component: PostCategoriaCriarComponent;
  let fixture: ComponentFixture<PostCategoriaCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCategoriaCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategoriaCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
