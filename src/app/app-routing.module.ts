import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GalleryComponent } from '../app/Gallery/gallery.component';

const routes: Routes = [
  // { path: 'photo-gallery', component: GalleryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
