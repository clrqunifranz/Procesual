import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { EstimadorComponent } from './components/estimador/estimador.component';
import { PublicarComponent } from './components/publicar/publicar.component';

const routes: Routes = [
  { path: '', component: MarketplaceComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'estimador', component: EstimadorComponent },
  { path: 'publicar', component: PublicarComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }