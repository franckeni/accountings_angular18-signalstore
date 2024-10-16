import { Actions, ROUTES_PATHS } from './constants';
import { Id } from '../valueObjects/id.vo';

export class Utils {
  static getUrlFromAction(from: string, action: Actions, sufix?: Id | string) {
    const sufx = sufix ? '/' + sufix : '';
    const index = (from + action) as keyof typeof ROUTES_PATHS;

    return `/${ROUTES_PATHS.dashboard}/${ROUTES_PATHS[index]}${sufx}`;
  }

  static routeStartWithEditOrCreateOrDelete(url: string, from: string): boolean {
    const editIndex = (from + 'Edit') as keyof typeof ROUTES_PATHS;
    const createIndex = (from + 'Create') as keyof typeof ROUTES_PATHS;
    const deleteIndex = (from + 'Delete') as keyof typeof ROUTES_PATHS;

    return (
      url.startsWith(`/${ROUTES_PATHS['dashboard']}/${ROUTES_PATHS[editIndex]}`) ||
      url.startsWith(`/${ROUTES_PATHS['dashboard']}/${ROUTES_PATHS[createIndex]}`) ||
      url.startsWith(`/${ROUTES_PATHS['dashboard']}/${ROUTES_PATHS[deleteIndex]}`)
    );
  }
}
