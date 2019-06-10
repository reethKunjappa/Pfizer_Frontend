import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ChartJsComponent } from '../../chart-js/chart-js.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material/icon';
import { MdePopoverModule } from '@material-extended/mde';
import { MatButtonModule,MatInputModule,MatRippleModule,MatFormFieldModule,MatTooltipModule,MatSelectModule,MatCardModule,MatSidenavModule,MatDialogModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

import { SimplePdfViewerModule } from 'simple-pdf-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts-x';

import { MaterialModule } from 'app/material.module';

import { ProjectComponent } from '../../project/project.component';
import { CompareComponent, CommentsConfirmationModal } from '../../compare/compare.component';
import { ViewProjectComponent } from '../../view-project/view-project.component';
import { FavoriteProjectComponent } from '../../favorite-project/favorite-project.component';
import { CreateProjectModalComponent } from '../../create-project-modal/create-project-modal.component';
import { UploadDocumentsModalComponent } from '../../upload-documents-modal/upload-documents-modal.component';
import { HistoryComponent } from '../../history/history.component';
import { CommentsComponent } from '../../comments/comments.component';
import { MappingSpecComponent } from '../../mapping-spec/mapping-spec.component';
import { QualityChecklistComponent } from '../../quality-checklist/quality-checklist.component';
import { AdminPreferencesComponent } from '../../admin-preferences/admin-preferences.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatSidenavModule,
    FileUploadModule,
    MatIconModule,
    MdePopoverModule,
    MatDialogModule,
    MatChipsModule,
    MaterialModule,
    MatBadgeModule,
    SimplePdfViewerModule,
    NgSelectModule,
    ChartsModule,
  ],
  declarations: [
    ChartJsComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProjectComponent,
    CompareComponent,
    CommentsConfirmationModal,
    ViewProjectComponent,
    FavoriteProjectComponent,
    CreateProjectModalComponent,
    UploadDocumentsModalComponent,
    HistoryComponent,
    CommentsComponent,
    MappingSpecComponent,
    QualityChecklistComponent,
    AdminPreferencesComponent,
  ],
  entryComponents: [
    CreateProjectModalComponent,UploadDocumentsModalComponent, CommentsConfirmationModal,
  ],
})

export class AdminLayoutModule {}
