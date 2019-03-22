import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProjectComponent } from '../../project/project.component';
import { CompareComponent } from '../../compare/compare.component';
import { ViewProjectComponent } from '../../view-project/view-project.component'
import { UserProfileComponent } from 'app/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'compare', component: CompareComponent },
    { path: 'view', component: ViewProjectComponent },
    { path: 'create', component: UserProfileComponent },
];
