import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProtocolComponent } from '../../protocol/protocol.component';
import { FileUploadModule } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material/icon';
import { MdePopoverModule } from '@material-extended/mde';
import { MatButtonModule,MatInputModule,MatRippleModule,MatFormFieldModule,MatTooltipModule,MatSelectModule,MatCardModule,MatSidenavModule } from '@angular/material';

import { ProjectComponent } from '../../project/project.component';
import { CompareComponent } from '../../compare/compare.component';
import { ViewProjectComponent } from '../../view-project/view-project.component';

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
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProtocolComponent,
    ProjectComponent,
    CompareComponent,
    ViewProjectComponent
  ]
})

export class AdminLayoutModule {}
