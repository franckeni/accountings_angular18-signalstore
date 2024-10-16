import { Id } from "../../shared/valueObjects/id.vo";
import { Observable } from "rxjs";

export interface IBaseModel {
    id?: Id
}

export interface ISetting {
    production: boolean;
    services: {
      api: {
        baseUrl:  string,
      }
    };
    aws: {
      AWS_DEFAULT_REGION:  string,
    };
}

export interface ISettingService {
    load(): Observable<void>;
    getConfig(): ISetting | null | undefined;
}