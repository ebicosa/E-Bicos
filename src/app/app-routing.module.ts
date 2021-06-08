import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'entrar',
    loadChildren: () => import('./pages/entrar/entrar.module').then( m => m.EntrarPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'filtros',
    loadChildren: () => import('./pages/filtros/filtros.module').then( m => m.FiltrosPageModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'servicos',
    loadChildren: () => import('./pages/servicos/servicos.module').then( m => m.ServicosPageModule)
  },  {
    path: 'busca',
    loadChildren: () => import('./pages/busca/busca.module').then( m => m.BuscaPageModule)
  },
  {
    path: 'central-ajuda',
    loadChildren: () => import('./pages/central-ajuda/central-ajuda.module').then( m => m.CentralAjudaPageModule)
  },
  {
    path: 'meus-dados',
    loadChildren: () => import('./pages/meus-dados/meus-dados.module').then( m => m.MeusDadosPageModule)
  },
  {
    path: 'endereco',
    loadChildren: () => import('./pages/endereco/endereco.module').then( m => m.EnderecoPageModule)
  },
  {
    path: 'inserir-servico',
    loadChildren: () => import('./pages/inserir-servico/inserir-servico.module').then( m => m.InserirServicoPageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./pages/contatos/contatos.module').then( m => m.ContatosPageModule)
  },
  {
    path: 'quem-somos',
    loadChildren: () => import('./pages/quem-somos/quem-somos.module').then( m => m.QuemSomosPageModule)
  },
  {
    path: 'termos-de-uso',
    loadChildren: () => import('./pages/termos-de-uso/termos-de-uso.module').then( m => m.TermosDeUsoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
