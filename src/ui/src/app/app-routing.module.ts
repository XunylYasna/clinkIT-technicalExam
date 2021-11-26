import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [{
  path: '', redirectTo: 'home', pathMatch: 'full',
}, {
  path: 'home', component: HomeComponent
}, {
  path: 'table', component: TableComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
