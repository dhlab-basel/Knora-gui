import {Component, OnInit} from '@angular/core';
import {AppDemo} from '../../app.config';
import {ApiServiceError, Project, ProjectsService} from '@knora/core';

@Component({
  selector: 'app-core-demo',
  templateUrl: './core-demo.component.html',
  styleUrls: ['./core-demo.component.scss']
})
export class CoreDemoComponent implements OnInit {

  module = AppDemo.coreModule;

  public allProjects: Project[];

  projectIri = 'http://rdfh.ch/projects/00FF';   // images project

  project: Project;


  public isLoading = true;

  constructor(private _projectsService: ProjectsService) {
  }

  ngOnInit() {

    this._projectsService.getAllProjects()
      .subscribe(
        (result: Project[]) => {
          this.allProjects = result;
          this.isLoading = false;
        },
        (error: ApiServiceError) => {
          console.log(error);
        }
      );

    /*
    this._projectsService.getProjectByIri(this.projectIri)
      .subscribe(
        (result: Project) => {
          this.project = result;
          console.log(this.project);
          this.isLoading = false;
        },
        (error: ApiServiceError) => {
          console.log(error);
        }

      );
      */

  }

}
