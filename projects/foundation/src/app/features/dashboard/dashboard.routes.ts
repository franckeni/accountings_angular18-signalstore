import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListAccountsTypeComponent } from './components/accounts-type/list/list-accounts-type.component';
import { ROUTES_PATHS } from '../../shared/utils/constants';
import { accountsTypeGetUsecaseResolver } from '../../adapters/accounts-type/resolvers';
import { accountsTypeGetUsecaseProvider } from '../../adapters/accounts-type/providers';

/**
 * Edit, Create and Delete routes here point to the same component
 * because, we use dialog Forms on the list view.
 * This maintain a user friendly url routing
 * 
 * 
 * Delete has the same Resolver as Edit because item need to be selected
 * in dialog component before user confirm it deletion
 */
export const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ROUTES_PATHS.AccountsTypeList, component: ListAccountsTypeComponent },
  { path: ROUTES_PATHS.AccountsTypeCreate, component: ListAccountsTypeComponent },
  { path: ROUTES_PATHS.AccountsTypeEdit+'/:id', component: ListAccountsTypeComponent,
    resolve: {
      accountsTypeGet: accountsTypeGetUsecaseResolver
    }, 
    providers: [accountsTypeGetUsecaseProvider] 
  },
  { path: ROUTES_PATHS.AccountsTypeDelete+'/:id', component: ListAccountsTypeComponent,
    resolve: {
      accountsTypeGet: accountsTypeGetUsecaseResolver
    }, 
    providers: [accountsTypeGetUsecaseProvider] 
  },
  { path: '**', redirectTo: ROUTES_PATHS.AccountsTypeList }
]
