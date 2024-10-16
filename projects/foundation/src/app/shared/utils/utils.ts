import { Actions } from "../models/common";
import { ROUTES_PATHS } from "./constants";
import { Id } from "../valueObjects/id.vo";

export class Utils {

  static getUrlFromAction(from: string, action: Actions, sufix?: Id | string) {
    return '/' + ROUTES_PATHS.dashboard + '/' + ROUTES_PATHS[from][action] + (sufix ? '/'+sufix : '');
  }

  static routeStartWithEditOrCreateOrDelete(url: string, from: string): boolean {
    return url.startsWith('/'+ROUTES_PATHS.dashboard + '/' + ROUTES_PATHS[from].edit) || 
          url.startsWith('/'+ROUTES_PATHS.dashboard + '/' + ROUTES_PATHS[from].create) ||
          url.startsWith('/'+ROUTES_PATHS.dashboard + '/' + ROUTES_PATHS[from].delete);
  }
}