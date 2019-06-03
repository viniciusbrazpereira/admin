import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { HomeComponent } from "./shared/home/home.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { HeaderComponent } from "./shared/header/header.component";
import { ContentComponent } from "./shared/content/content.component";

import { SiteHomeComponent } from "./site/home/home.component";
import { SiteHeaderComponent } from "./site/header/header.component";
import { SiteContentComponent } from "./site/content/content.component";
import { SiteContactComponent } from "./site/contact/contact.component";

import { SiteTeamComponent } from "./site/team/team.component";

import { LoginComponent } from './modules/login/login.component';

/*
const appRoutes: Routes = [

    // App routes goes here here
    {
        path: '',
        component: HomeComponent,
        canActivate : [AuthGuard],
        data : {
          title: "header.title.home" ,
          // Permission view link menu
          layoutPermissionViewLink:['LAYOUT_LIST'],
          processPermissionViewLink: ['PROCESSING_MANAGEMENT'],
          approvalPermissionViewLink:['LAYOUT_APPROVE'],
          pluginPermissionViewLink: ['LAYOUT_LIST']
        },
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {breadcrumb: 'header.breadcrumb.home', permission: 'LAYOUT_LIST'},
            canActivate: [AuthGuard, PermissionGuard]
          },
          {
            path: 'error404',
            component: Error404Component,
            data: {breadcrumb: 'header.breadcrumb.error404'},
            canActivate: [AuthGuard]
          },
          {
            path: 'error403',
            component: Error403Component,
            data: {breadcrumb: 'header.breadcrumb.error403'},
            canActivate: [AuthGuard]
          },
          {
            path: 'layout',
            component: LayoutComponent,
            data: {breadcrumb: 'header.breadcrumb.layout', permission: 'LAYOUT_LIST'},
            children: [
              {
                path: 'list',
                component: LayoutListComponent,
                data: {
                  breadcrumb: 'header.breadcrumb.list-default',
                  title: 'header.title.layouts',
                  permission: ['LAYOUT_LIST'],
                  permissionBlockLayout: ['PROCESSING_MANAGEMENT']
                },
                canActivate: [AuthGuard, PermissionGuard]
              },
              {
                path: 'form/:id',
                component: LayoutFormComponent,
                data: {breadcrumb: 'header.breadcrumb.edit', title: 'header.title.layouts', permission: ['LAYOUT_LIST']},
                canActivate: [AuthGuard, PermissionGuard]
              },
              {
                path: 'template/:id',
                component: LayoutTemplateComponent,
                data: {breadcrumb: 'header.breadcrumb.template', title: 'header.title.template', permission: ['LAYOUT_LIST']},
                canActivate: [AuthGuard, PermissionGuard]
              }
            ]
          },
          {
            path: 'process',
            component: ProcessComponent,
            data: {
              breadcrumb: 'header.breadcrumb.process'
            },
            children: [
              {
                path: 'list',
                component: ProcessListComponent,
                data: {breadcrumb: 'header.breadcrumb.list-default', title: 'header.title.process', permission: ['LAYOUT_LIST', 'LAYOUT_EDIT']},
                canActivate: [AuthGuard, PermissionGuard]
              }
            ]
          },
          {
            path: 'workflow',
            component: WorkflowComponent,
            data: {breadcrumb: 'header.breadcrumb.workflow'},
            children: [
              {
                path: 'list',
                component: WorkflowListComponent,
                data: {breadcrumb: 'header.breadcrumb.list-default', title: 'header.title.workflow', permission: ['LAYOUT_LIST', 'LAYOUT_EDIT']},
                canActivate: [AuthGuard, PermissionGuard]
              },
              {
                path: 'form/:id',
                component: LayoutFormComponent,
                data: {view: true, breadcrumb: 'header.breadcrumb.edit', title: 'header.title.layouts', permission: ['LAYOUT_EDIT']},
                canActivate: [AuthGuard]
              }
            ]
          },
          {
            path: 'plugin',
            component: PluginComponent,
            data: {breadcrumb: 'header.breadcrumb.plugins'},
            children: [
              {
                path: 'list',
                component: PluginListComponent,
                data: {breadcrumb: 'header.breadcrumb.list-default', title: 'header.title.plugins', permission: ['LAYOUT_LIST', 'LAYOUT_EDIT']},
                canActivate: [AuthGuard, PermissionGuard]
              }
            ]
          },
          {
            path: 'reports',
            component: ReportsComponent,
            data: {breadcrumb: 'header.breadcrumb.reports'},
            children: [
              {
                path: 'list',
                component: ReportsListComponent,
                data: {breadcrumb: 'header.breadcrumb.list-default', title: 'header.title.reports', permission: ['LAYOUT_LIST', 'LAYOUT_EDIT']},
                canActivate: [AuthGuard, PermissionGuard]
              }
            ]
          }
        ]
    },

    //no layout routes
    {path: 'login', component: LoginComponent},

    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];
*/

const routes: Routes = [
  {
    path: '',
    component: SiteHomeComponent,
    children: [
      {
        path: 'time',
        component: SiteTeamComponent
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    data : {
      title: "header.title.home" ,
    }
  },
  //no layout routes
  {path: 'login', component: LoginComponent},
];

export const AdminRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
