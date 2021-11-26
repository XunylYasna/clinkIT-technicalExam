import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './pages/table/table.component';
import { FileUploadModalComponent } from './components/file-upload-modal/file-upload-modal.component';

const components = [
    HomeComponent,
    HeaderComponent,
    SpinnerComponent,
    SidebarComponent,
    MapComponent,
    TableComponent,
    FileUploadModalComponent
];

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LeafletModule
    ],
    declarations: components,
    exports: components
})
export class UiModule { }
