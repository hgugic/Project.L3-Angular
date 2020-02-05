import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MakeListComponent } from './vehicle-make/make-list/make-list.component';
import { MakeEditComponent } from './vehicle-make/make-edit/make-edit.component';
import { MakeDetailsComponent } from './vehicle-make/make-details/make-details.component';
import { MakeListResolver } from './_resolvers/make.list.resolver';
import { MakeEditResolver } from './_resolvers/make.edit.resolver';
import { MakeCreateComponent } from './vehicle-make/make-create/make-create.component';
import { ModelCreateComponent } from './vehicle-model/model-create/model-create.component';
import { ModelEditComponent } from './vehicle-model/model-edit/model-edit.component';
import { ModelDetailsComponent } from './vehicle-model/model-details/model-details.component';
import { ModelListComponent } from './vehicle-model/model-list/model-list.component';
import { ModelCreateResolver } from './_resolvers/model.create.resolver';
import { ModelEditResolver } from './_resolvers/model.edit.resolver';
import { ModelListResolver } from './_resolvers/model.list.resolver';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
      path: '',
      runGuardsAndResolvers: 'always',

      children: [
          { path: 'vehicleMake', component: MakeListComponent, resolve: {makers: MakeListResolver}},
          { path: 'vehicleMake/:id', component: MakeDetailsComponent, resolve: { maker: MakeEditResolver }},
          { path: 'vehicleMake/edit/:id', component: MakeEditComponent, resolve: { maker: MakeEditResolver }},
          { path: 'create/vehicleMake', component: MakeCreateComponent},

          { path: 'vehicleModel', component: ModelListComponent, resolve: { models: ModelListResolver }  },
          { path: 'vehicleModel/:id', component: ModelDetailsComponent, resolve: { model: ModelEditResolver }},
          { path: 'vehicleModel/edit/:id', component: ModelEditComponent, resolve: { model: ModelEditResolver },},
          { path: 'create/vehicleModel', component: ModelCreateComponent, resolve: { makers: ModelCreateResolver }},
      ]

  },
  
  { path: '**', redirectTo: '', pathMatch: 'full' },
];


