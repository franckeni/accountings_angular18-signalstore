import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { 
  AccountsType, 
  AccountsTypeResponseDTO,
  AccountsTypeListResponseDTO, 
  AccountsTypeUpdate, 
  AccountsTypeSchema} from '../../../domain/accounts-type/models';
import { BASE_URLS } from '../../../shared/utils/base.urls';
import { IAccountsTypeRepositoryService } from '../../../domain/accounts-type/services';
import { Id } from '../../../shared/valueObjects/id.vo';
import { SettingsService } from '../../../shared/services/settings.service';
import { ISetting } from '../../../domain/base/model';

@Injectable({
  providedIn: 'root'
})
export class AccountsTypeRepositoryService implements IAccountsTypeRepositoryService {

  readonly http = inject(HttpClient);
  readonly platformId = inject(PLATFORM_ID);
  readonly config: ISetting | null | undefined = inject(SettingsService).getConfig();

  endpoint: string = `${this.config!.services.api.baseUrl}/`+`${BASE_URLS.ACCOUNTS_TYPE.endpoint}`;

  /**
   * Check Data schema from API response with zod parse function
   * @param filter 
   * @returns 
   */
  fetchAll(): Observable<AccountsTypeListResponseDTO> {
    return this.http
      .get<AccountsTypeListResponseDTO>(this.endpoint, {params: {"parent_only": true}})
      .pipe(map((response) => AccountsTypeListResponseDTO.parse(response)));
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  findOne(id: Id): Observable<AccountsTypeResponseDTO> {
    return this.http
      .get<AccountsTypeResponseDTO>(this.endpoint+`/${id}`)
      .pipe(map((response) => AccountsTypeSchema.parse(response)))
  }

  /**
   * 
   * @param accountsType 
   * @returns 
   */
  create(accountsType: AccountsType): Observable<AccountsTypeResponseDTO> {
    return this.http.post<AccountsTypeResponseDTO>(this.endpoint, accountsType);
  }

  /**
   * 
   * @param id 
   * @param accountsType 
   * @returns 
   */
  update(id: Id, accountsType: AccountsTypeUpdate): Observable<AccountsTypeResponseDTO> {
    return this.http.patch<AccountsTypeResponseDTO>(this.endpoint+`/${id}`, accountsType);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: Id): Observable<boolean> {
    return this.http.delete<boolean>(this.endpoint+`/${id}`);
  }
}
