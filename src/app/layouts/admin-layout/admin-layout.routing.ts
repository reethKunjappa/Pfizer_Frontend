import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProjectComponent } from '../../project/project.component';
import { CompareComponent } from '../../compare/compare.component';
import { ViewProjectComponent } from '../../view-project/view-project.component'
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { FavoriteProjectComponent } from 'app/favorite-project/favorite-project.component';
import { HistoryComponent } from 'app/history/history.component';
import { CommentsComponent } from 'app/comments/comments.component';
import { MappingSpecComponent } from 'app/mapping-spec/mapping-spec.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'compare/:id', component: CompareComponent },
    { path: 'compare/:id/:view', component: CompareComponent },
    { path: 'view', component: ViewProjectComponent },
    { path: 'view/:id', component: ViewProjectComponent },
    { path: 'create', component: UserProfileComponent },
    { path: 'create/:id', component: UserProfileComponent },
    { path: 'favorite', component: FavoriteProjectComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'history/:id', component: HistoryComponent },
    { path: 'comments', component: CommentsComponent },
    { path: 'comments/:id', component: CommentsComponent },
    { path: 'mappingSpec', component: MappingSpecComponent },
    { path: 'mappingSpec/:id', component: MappingSpecComponent },
];
