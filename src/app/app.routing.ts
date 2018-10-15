import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { HomeComponent } from "./shared/home/home.component";

const routes: Routes = [
  { path: "**", component: HomeComponent }
];

export const AdminRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
