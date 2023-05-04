import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCriarComponent } from './post-criar.component';

describe('PostCriarComponent', () => {
  let component: PostCriarComponent;
  let fixture: ComponentFixture<PostCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
