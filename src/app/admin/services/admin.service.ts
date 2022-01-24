import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseTCollection } from 'src/app/shared/models/api-response-t-collection.model';
import { RolesModel } from '../models/roles.model';
import { PermissionsModel } from '../models/permissions.model';
import { UpdatePermissions } from '../models/update-permissions.model';
import { AddNewTemplatePropertyModel } from '../models/add-new-template.model';
import {  AddDocTemplateModel } from '../models/add-doc-template.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
//gets the permissions by Role by passing role id as a parameter
  public getPermissionsByRole(role: string): Observable<ApiResponseTCollection<string>> {
    return this.http.get<any>(this.dataServiceUrl + `User/GetPermissionsByRole/${role}`);
  }
//gets the all roles
  public getAllRoles(): Observable<ApiResponseTCollection<RolesModel>> {
    return this.http.get<any>(this.dataServiceUrl + `User/GetAllRoles`);
  }
//gets all permission 
  public getAllPermissions(): Observable<ApiResponseTCollection<PermissionsModel>> {
    return this.http.get<any>(this.dataServiceUrl + `User/GetAllPermissions`);
  }
//gets the permission by role id
  public getPermissionsByRoleId(roleId: number): Observable<ApiResponseTCollection<PermissionsModel>> {
    return this.http.get<any>(this.dataServiceUrl + `User/GetPermissionsByRoleId/${roleId}`);
  }
//updates the permissions
  public updatePermissions(postData: UpdatePermissions): Observable<ApiResponseTCollection<string>> {
    return this.http.post<any>(this.dataServiceUrl + `User/UpdatePermissions`,postData);
  }

  public addNewTemplateProperty(postData: AddNewTemplatePropertyModel): Observable<ApiResponseTCollection<string>> {
    return this.http.post<any>(this.dataServiceUrl + `Document/AddNewTemplateProperty`, postData);
  }
  //updates the permissions
  public addNewDocumentTemplate(postData: AddDocTemplateModel): Observable<ApiResponseTCollection<string>> {
    return this.http.post<any>(this.dataServiceUrl + `Document/AddNewDocumentTemplate`,postData);
  }

  public addNewDocumentRequestType(requestType:string,isDenial:boolean): Observable<ApiResponseTCollection<string>> {
    return this.http.post<any>(this.dataServiceUrl + `Document/AddNewDocumentRequestType/${requestType}/${isDenial}`,{});
  }

}
