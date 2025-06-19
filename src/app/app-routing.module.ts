import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@application/auth/auth-guard.service';
import { StudentGuard } from '@application/guards/student.guard';
import { TeacherGuard } from '@application/guards/teacher.guard';
import { WelcomeGuard } from '@application/guards/welcome.guard';
import { LoginGuard } from '@application/guards/login.guard';
import { AdminGuard } from '@application/guards/admin.guard';

import { WelcomeRouteComponent } from './welcome-route/welcome-route.component';

import { ForosComponent } from './foros/foros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ModulosComponent } from './modulos/modulos.component';
import { PageNotFoundComponent, WelcomeComponent } from '@ui/pages';
import { LayoutComponent } from './layout/layout.component';
import { ArtefactoCardComponent } from './artefacto-card/artefacto-card.component';
import { SponsorIntroComponent } from './sponsor-intro/sponsor-intro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DescriptionIntroComponent } from './description-intro/description-intro.component';
import { BienvenidoTeacherComponent } from './bienvenido-teacher/bienvenido-teacher.component';
import { ModuloTeacherComponent } from './modulo-teacher/modulo-teacher.component';
import { PanelEvaluacionComponent } from './panel-evaluacion/panel-evaluacion.component';
import { ModuleIntroComponent } from './module-intro/module-intro.component';
import { ModuleActividadesMatematicasComponent } from './module-actividades-matematicas/module-actividades-matematicas.component';
import { ModuleActividadesCompetenciasCiudadanasComponent } from './module-actividades-competencias-ciudadanas/module-actividades-competencias-ciudadanas.component';
import { ModuleActividadesCompetenciasSocioemocionalesComponent } from './module-actividades-competencias-socioemocionales/module-actividades-competencias-socioemocionales.component';
import { ModuleActividadesCienciasNaturalesComponent } from './module-actividades-ciencias-naturales/module-actividades-ciencias-naturales.component';
import { ModuleActividadesLenguajeComponent } from './module-actividades-lenguaje/module-actividades-lenguaje.component';
import { IntroRetosComponent } from './intro-retos/intro-retos.component';
import { RetosComponent } from './retos/retos.component';
import { ModalesComponent } from './modales/modales.component';
import { AboutBilanComponent } from './about-bilan/about-bilan.component';

import { AdminLoginComponent } from './admin-login/admin-login.component';

import { PanelColegioComponent } from './panel-colegio/panel-colegio.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RetosPreguntasComponent } from './retos-preguntas/retos-preguntas.component';
import { RetoDelTrabajoComponent } from './retos/reto-del-trabajo/reto-del-trabajo.component';
import { RetoDeValentiaComponent } from './retos/reto-de-valentia/reto-de-valentia.component';
import { RetoDeMagiaComponent } from './retos/reto-de-magia/reto-de-magia.component';
import { RetoDePlaneacionComponent } from './retos/reto-de-planeacion/reto-de-planeacion.component';
import { RetoDelElementoComponent } from './retos/reto-del-elemento/reto-del-elemento.component';
import { RetoDeLabranzaComponent } from './retos/reto-de-labranza/reto-de-labranza.component';
import { RetoDeLasEstacionesComponent } from './retos/reto-de-las-estaciones/reto-de-las-estaciones.component';
import { RetoDeLosEspiritusComponent } from './retos/reto-de-los-espiritus/reto-de-los-espiritus.component';
import { ForoComponent } from './foro/foro.component';
import { TableroDirectivoComponent } from './tablero-directivo/tablero-directivo.component';
import { PanelControlComponent, PanelDirectivoComponent, PanelEditUsersComponent } from '@ui/pages/panels';
import { PanelUploadsComponent } from '@ui/pages/panels/panel-uploads/panel-uploads.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: WelcomeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardService, StudentGuard],
      },
      {
        path: 'modulos',
        component: ModulosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/:materia',
        component: ModuleIntroComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/matematicas/actividades/:grade/:page',
        component: ModuleActividadesMatematicasComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/competencias-ciudadanas/actividades/:grade/:page',
        component: ModuleActividadesCompetenciasCiudadanasComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/competencias-socioemocionales/actividades/:grade/:page',
        component: ModuleActividadesCompetenciasSocioemocionalesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/ciencias-naturales/actividades/:grade/:page',
        component: ModuleActividadesCienciasNaturalesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/lenguaje/actividades/:grade/:page',
        component: ModuleActividadesLenguajeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/:materia/retos',
        component: IntroRetosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'modulos/:materia/retos/:type',
        component: RetosComponent,
        canActivate: [AuthGuardService],
      },
      //--------------------------------------- retos
      {
        path: 'modulos/:materia/retos/:type/1/:grade/:name',
        component: RetosPreguntasComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/2/:grade/:name',
        component: RetoDePlaneacionComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/3/:grade/:name',
        component: RetoDeValentiaComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/4/:grade/:name',
        component: RetoDelElementoComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/5/:grade/:name',
        component: RetoDeMagiaComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/6/:grade/:name',
        component: RetoDeLabranzaComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/7/:grade/:name',
        component: RetoDelTrabajoComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/8/:grade/:name',
        component: RetoDeLasEstacionesComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      {
        path: 'modulos/:materia/retos/:type/9/:grade/:name',
        component: RetoDeLosEspiritusComponent,
        canActivate: [AuthGuardService, AdminGuard],
      },
      //--------------------------------------- retos
      // {
      //   path: 'maloka',
      //   component: MalokaComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'maloka/civil',
      //   component: MalokaCivilComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'maloka/espiritual',
      //   component: MalokaEspiritualComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'maloka/exploracion',
      //   component: MalokaExploracionComponent,
      //   canActivate: [AuthGuardService],
      // },
      {
        path: 'artefactos',
        component: ArtefactoCardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'teacher',
        component: BienvenidoTeacherComponent,
        canActivate: [AuthGuardService, TeacherGuard],
      },
      {
        path: 'admin/panel-control/:type',
        component: PanelControlComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
      {
        path: 'admin/panel-edit/:page/:partialDocument',
        component: PanelEditUsersComponent,
        canActivate: [AuthGuardService, TeacherGuard],
      },
      {
        path: 'teacher/:materia/:grade/:course/:phase/modulo',
        component: ModuloTeacherComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
      {
        path: 'teacher/:materia/:grade/:course/:phase/panel-evaluacion',
        component: PanelEvaluacionComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
      {
        path: 'admin/panel-directivo',
        component: PanelDirectivoComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
       {
        path: 'admin/panel-uploads',
        component: PanelUploadsComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
      {
        path: 'admin/tablero-directivo',
        component: TableroDirectivoComponent,
        canActivate: [AuthGuardService, TeacherGuard, AdminGuard],
      },
      {
        path: 'acerca-de-bilan/:about',
        component: AboutBilanComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'foros/:page',
        component: ForosComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'foro/:page/:id',
        component: ForoComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'loading',
    component: WelcomeRouteComponent,
    canActivate: [WelcomeGuard],
  },
  {
    path: 'sponsor',
    component: SponsorIntroComponent,
  },
  {
    path: 'description',
    component: DescriptionIntroComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'register',
    component: LoginPageComponent,
  },
  {
    path: 'colegio',
    component: PanelColegioComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
