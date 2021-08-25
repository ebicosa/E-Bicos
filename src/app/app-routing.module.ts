import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate : [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'entrar',
    loadChildren: () => import('./pages/entrar/entrar.module').then( m => m.EntrarPageModule),

    canActivate : [LoginGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule),
    canActivate : [LoginGuard]
  },
  {
    path: 'servicos/filtros',

    loadChildren: () => import('./pages/servicos/filtros/filtros.module').then( m => m.FiltrosPageModule),
    canActivate : [AuthGuard]

  },
  {
    path: 'servicos/filtros/:nome',

    loadChildren: () => import('./pages/servicos/filtros/filtros.module').then( m => m.FiltrosPageModule),
    canActivate : [AuthGuard]

  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule),
    canActivate : [LoginGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'servicos',
    loadChildren: () => import('./pages/servicos/servicos.module' ).then( m => m.ServicosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'servicos/:nome',
    loadChildren: () => import('./pages/servicos/servicos.module' ).then( m => m.ServicosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'central-ajuda',
    loadChildren: () => import('./pages/central-ajuda/central-ajuda.module').then( m => m.CentralAjudaPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'endereco',
    loadChildren: () => import('./pages/endereco/endereco.module').then( m => m.EnderecoPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'inserir-servico',
    loadChildren: () => import('./pages/inserir-servico/inserir-servico.module').then( m => m.InserirServicoPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'contatos',
    loadChildren: () => import('./pages/contatos/contatos.module').then( m => m.ContatosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'anuncio',
    loadChildren: () => import('./pages/anuncio/anuncio.module').then( m => m.AnuncioPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule),
    canActivate : [AuthGuard]
  },
  {
    path: 'cancelar-cadastro',
    loadChildren: () => import('./pages/cancelar-cadastro/cancelar-cadastro.module').then( m => m.CancelarCadastroPageModule),
    canActivate : [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
