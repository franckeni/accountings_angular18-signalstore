import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListAccountsTypeComponent } from './components/accounts-type/list/list-accounts-type.component';
import { ROUTES_PATHS } from '../../shared/utils/constants';
import { accountsTypeGetUsecaseResolver } from '../../adapters/accounts-type/resolvers';
import { AccountsTypeGetUsecaseProvider } from '../../adapters/accounts-type/providers';

/**
 * Edit, Create and Delete routes here point to the same component
 * because, we use dialog Forms on the list view.
 * This maintain a user friendly url routing
 * 
 * 
 * Delete has the same Resolver as Edit because item need to be selected
 * in dialog component before user confirm it deletion
 */
export const dashboard_routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ROUTES_PATHS.AccountsType.list, component: ListAccountsTypeComponent },
  { path: ROUTES_PATHS.AccountsType.create, component: ListAccountsTypeComponent },
  { path: ROUTES_PATHS.AccountsType.edit+'/:id', component: ListAccountsTypeComponent,
    resolve: {
      accountsTypeGet: accountsTypeGetUsecaseResolver
    }, 
    providers: [AccountsTypeGetUsecaseProvider] 
  },
  { path: ROUTES_PATHS.AccountsType.delete+'/:id', component: ListAccountsTypeComponent,
    resolve: {
      accountsTypeGet: accountsTypeGetUsecaseResolver
    }, 
    providers: [AccountsTypeGetUsecaseProvider] 
  },
  { path: '**', redirectTo: ROUTES_PATHS.AccountsType.list }
]
