import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./layouts/default-layout/default-layout.module').then((m) => m.DefaultLayoutModule), },
  { path: '**', loadChildren: () => import('./layouts/default-layout/default-layout.module').then((m) => m.DefaultLayoutModule), },
];


@NgModule({
  declarations: [],
  imports: [CommonModule,
            RouterModule.forRoot(routes)
            //RouterModule.forChild(routes)
          ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
