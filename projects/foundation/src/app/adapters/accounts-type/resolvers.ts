import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GetUsecase, ListUsecase } from "../../domain/accounts-type/usecases";
import { Id } from "../../shared/valueObjects/id.vo";
import { Unsubscribable } from "rxjs";

export const accountsTypeListUsecaseResolver: ResolveFn<Unsubscribable> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Inject data service
  const usecase = inject(ListUsecase);

  return usecase.execute()
};

export const accountsTypeGetUsecaseResolver: ResolveFn<Unsubscribable> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Inject data service
  const usecase = inject(GetUsecase);

  return usecase.execute(new Id(route.params['id']))
};