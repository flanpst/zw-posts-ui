import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListarComponent } from './post-listar.component';

describe('PostListarComponent', () => {
  let component: PostListarComponent;
  let fixture: ComponentFixture<PostListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
