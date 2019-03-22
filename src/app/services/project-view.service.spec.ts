import { TestBed, inject } from '@angular/core/testing';

import { ProjectViewService } from './project-view.service';

describe('ProjectViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectViewService]
    });
  });

  it('should be created', inject([ProjectViewService], (service: ProjectViewService) => {
    expect(service).toBeTruthy();
  }));
});
