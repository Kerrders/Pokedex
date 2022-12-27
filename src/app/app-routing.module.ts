import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './views/details/details.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'pokemon/:name', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
