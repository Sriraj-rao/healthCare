import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseTCollection } from 'src/app/shared/models/api-response-t-collection.model';
import { ApiResponseTObject } from 'src/app/shared/models/api-response-t-object.model';
import { environment } from 'src/environments/environment';
import { AddNotesModel } from '../models/add-notes.model';
import { AddDocNotesModel } from '../models/doc-notes.model';
import { EditNotesModel } from '../models/edit-notes-model';
import { NotesModel } from '../models/notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  private dataServiceUrl = environment.config.apiHostUrl + 'api/';
  // gets the notes buy investigation group id
  public GetNotesByInvestigationGroup(
    groupId: number
  ): Observable<ApiResponseTCollection<NotesModel>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Notes/GetNotesByInvestigationGroup/${groupId}`
    );
  }

  // gets the notes for document request
  public getDocNotes(
    groupId: number,
    requestId: number,
    investigationId: number
  ): Observable<ApiResponseTCollection<NotesModel>> {
    return this.http.get<any>(
      this.dataServiceUrl +
        `Notes/GetNotesByDocumentRequest/${groupId}/${requestId}/${investigationId}`
    );
  }
  // gets the note by using note id as a parameter
  public getNoteById(
    noteId: number
  ): Observable<ApiResponseTObject<NotesModel>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Notes/GetNoteById/${noteId}`
    );
  }

  // adds the new note
  public addNotes(
    postData: AddNotesModel
  ): Observable<ApiResponseTObject<NotesModel>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Notes/AddNewNote`,
      postData
    );
  }

  // adds the new note in the document section
  public addDocNotes(
    postData: AddDocNotesModel
  ): Observable<ApiResponseTObject<NotesModel>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Notes/AddNewNote`,
      postData
    );
  }

  // updates the note
  public UpdateNotes(
    postData: EditNotesModel
  ): Observable<ApiResponseTCollection<any>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Notes/UpdateNote`,
      postData
    );
  }
  // deletes the note
  public deleteNotes(
    noteId: number
  ): Observable<ApiResponseTObject<NotesModel[]>> {
    return this.http.post<any>(
      this.dataServiceUrl + `Notes/DeleteNote/${noteId}`,
      {}
    );
  }
  // gets the data for editing note
  public editNotes(
    noteId: number
  ): Observable<ApiResponseTCollection<NotesModel[]>> {
    return this.http.get<any>(
      this.dataServiceUrl + `Notes/GetNoteById/${noteId}`,
      {}
    );
  }
}
