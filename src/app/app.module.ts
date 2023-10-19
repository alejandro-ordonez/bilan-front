import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MalokaComponent } from './maloka/maloka.component';
import { ForosComponent } from './foros/foros.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModuleBarComponent } from './module-bar/module-bar.component';
import { LayoutComponent } from './layout/layout.component';

import { LayoutModuleBarComponent } from './layout-module-bar/layout-module-bar.component';
import { ArtefactoCardComponent } from './artefacto-card/artefacto-card.component';
import { SponsorIntroComponent } from './sponsor-intro/sponsor-intro.component';
import { DescriptionIntroComponent } from './description-intro/description-intro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BienvenidoTeacherComponent } from './bienvenido-teacher/bienvenido-teacher.component';
import { ModuloTeacherComponent } from './modulo-teacher/modulo-teacher.component';
import { PanelEvaluacionComponent } from './panel-evaluacion/panel-evaluacion.component';
import { MalokaCivilComponent } from './maloka-civil/maloka-civil.component';
import { MalokaEspiritualComponent } from './maloka-espiritual/maloka-espiritual.component';
import { MalokaExploracionComponent } from './maloka-exploracion/maloka-exploracion.component';
import { RegisterComponent } from './register/register.component';
import { ModuleIntroComponent } from './module-intro/module-intro.component';
import { ModuleActividadesMatematicasComponent } from './module-actividades-matematicas/module-actividades-matematicas.component';
import { ModuleActividadesLenguajeComponent } from './module-actividades-lenguaje/module-actividades-lenguaje.component';
import { ModuleActividadesCienciasNaturalesComponent } from './module-actividades-ciencias-naturales/module-actividades-ciencias-naturales.component';
import { ModuleActividadesCompetenciasSocioemocionalesComponent } from './module-actividades-competencias-socioemocionales/module-actividades-competencias-socioemocionales.component';
import { ModuleActividadesCompetenciasCiudadanasComponent } from './module-actividades-competencias-ciudadanas/module-actividades-competencias-ciudadanas.component';
import { IntroRetosComponent } from './intro-retos/intro-retos.component';
import { RetosComponent } from './retos/retos.component';
import { QuizComponent } from './quiz/quiz.component';
import { ModalesComponent } from './modales/modales.component';
import { AboutBilanComponent } from './about-bilan/about-bilan.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserGateway } from '@domain/gateways/user.gateway';
import { AuthService } from '@application/auth/auth.service';
import { AuthGuardService } from '@application/auth/auth-guard.service';

// Components
import { SelectComponent } from '@ui/components/select/select.component';
import { ButtonComponent } from '@ui/components/button/button.component';
import { TextfieldComponent } from '@ui/components/textfield/textfield.component';
import { RadioSelectComponent } from '@ui/components/radio-select/radio-select.component';
import { TimerComponent } from './ui/components/timer/timer.component';
import { TotemBasicComponent } from './ui/components/totem-basic/totem-basic.component';
import { TotemSpecialComponent } from './ui/components/totem-special/totem-special.component';
import { EspiritusBarComponent } from './ui/components/espiritus-bar/espiritus-bar.component';

//Pages
import { PageNotFoundComponent, WelcomeComponent } from '@ui/pages';
import {  PanelControlComponent, PanelDirectivoComponent, DashboardComponent, DashboardStudentComponent, PanelEditUsersComponent } from '@ui/pages/panels'


import { UserDataGateway } from '@domain/gateways/user-data.gateway';
import { UserDataService } from '@application/user/user-data.service';
import { GameGateway } from '@domain/gateways/game.gateway';
import { GameService } from '@application/game/game.service';
import { LoaderComponent } from './ui/components/loader/loader.component';
import { MateriaPipePipe } from './utils/pipes/materia-pipe.pipe';
import { WelcomeRouteComponent } from './welcome-route/welcome-route.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardGateway } from '@domain/gateways/dashboard.gateway';
import { DashboardService } from '@application/dashboard/dashboard.service';
import { EvidenceGateway } from '@domain/gateways/evidence.gateway';
import { EvidenceService } from '@application/evidence/evidence.service';
import { ForumGateway } from '@domain/gateways/forum.gateway';
import { ForumService } from '@application/forum/forum.service';
import { PanelColegioComponent } from './panel-colegio/panel-colegio.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { RetosPreguntasComponent } from './retos-preguntas/retos-preguntas.component';
import { RetoDeValentiaComponent } from './retos/reto-de-valentia/reto-de-valentia.component';
import { RetoDeMagiaComponent } from './retos/reto-de-magia/reto-de-magia.component';
import { RetoDePlaneacionComponent } from './retos/reto-de-planeacion/reto-de-planeacion.component';
import { RetoDelTrabajoComponent } from './retos/reto-del-trabajo/reto-del-trabajo.component';
import { RetoDelElementoComponent } from './retos/reto-del-elemento/reto-del-elemento.component';
import { RetoDeLasEstacionesComponent } from './retos/reto-de-las-estaciones/reto-de-las-estaciones.component';
import { RetoDeLabranzaComponent } from './retos/reto-de-labranza/reto-de-labranza.component';
import { RetoDeLosEspiritusComponent } from './retos/reto-de-los-espiritus/reto-de-los-espiritus.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ForoComponent } from './foro/foro.component';
import { TableroDirectivoComponent } from './tablero-directivo/tablero-directivo.component';
import { GeneralInfoGateway, StudenGateway, TeacherDataGateway } from '@domain/gateways';
import { GeneralInfoService } from '@application/general-info/general-info.service';
import { Selectv2Component } from './ui/components/selectv2/selectv2.component';
import { UserService } from '@application/user/user.service';
import { TeacherService } from '@application/teacher/teacher.service';
import { StudentService } from '@application/student/student.service';
import { DashboardCollegeComponent } from './ui/pages/panels/panel-control/dashboard-college/dashboard-college.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    PerfilComponent,
    MalokaComponent,
    ForosComponent,
    ModulosComponent,
    ModuleBarComponent,
    LayoutComponent,
    PageNotFoundComponent,
    LayoutModuleBarComponent,
    ArtefactoCardComponent,
    SponsorIntroComponent,
    DescriptionIntroComponent,
    InicioComponent,
    LoginPageComponent,
    SelectComponent,
    Selectv2Component,
    ButtonComponent,
    TextfieldComponent,
    RadioSelectComponent,
    BienvenidoTeacherComponent,
    ModuloTeacherComponent,
    PanelEvaluacionComponent,
    MalokaCivilComponent,
    MalokaEspiritualComponent,
    MalokaExploracionComponent,
    RegisterComponent,
    ModuleIntroComponent,
    ModuleActividadesMatematicasComponent,
    ModuleActividadesLenguajeComponent,
    ModuleActividadesCienciasNaturalesComponent,
    ModuleActividadesCompetenciasSocioemocionalesComponent,
    ModuleActividadesCompetenciasCiudadanasComponent,
    IntroRetosComponent,
    PanelControlComponent,
    RetosComponent,
    QuizComponent,
    ModalesComponent,
    AboutBilanComponent,
    TimerComponent,
    TotemBasicComponent,
    TotemSpecialComponent,
    EspiritusBarComponent,
    LoaderComponent,
    MateriaPipePipe,
    WelcomeRouteComponent,
    AdminLoginComponent,
    PanelEditUsersComponent,
    PanelColegioComponent,
    ResetPasswordComponent,
    RetosPreguntasComponent,
    RetoDeValentiaComponent,
    RetoDeMagiaComponent,
    RetoDePlaneacionComponent,
    RetoDelTrabajoComponent,
    RetoDelElementoComponent,
    RetoDeLasEstacionesComponent,
    RetoDeLabranzaComponent,
    RetoDeLosEspiritusComponent,
    ForoComponent,
    PanelDirectivoComponent,
    TableroDirectivoComponent,
    Selectv2Component,
    DashboardStudentComponent,
    DashboardComponent,
    DashboardCollegeComponent,
  ],
  imports: [
    HttpClientXsrfModule.withOptions({
      cookieName: '979a8afa-a4ad-4400-8291-8394d59096c6',
      headerName: '667508f9-3517-4719-a1d4-81a5c2b1def3'
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: UserGateway,
      useClass: UserService,
    },
    {
      provide: UserDataGateway,
      useClass: UserDataService,
    },
    {
      provide: GameGateway,
      useClass: GameService,
    },
    {
      provide: DashboardGateway,
      useClass: DashboardService,
    },
    {
      provide: EvidenceGateway,
      useClass: EvidenceService,
    },
    {
      provide: ForumGateway,
      useClass: ForumService,
    },
    {
      provide: GeneralInfoGateway,
      useClass: GeneralInfoService
    },
    {
      provide: TeacherDataGateway,
      useClass: TeacherService
    },
    {
      provide: StudenGateway,
      useClass: StudentService
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
