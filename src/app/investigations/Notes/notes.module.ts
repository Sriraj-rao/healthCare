import { NgModule } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { ViewEditNotesComponent } from './modals/view-edit-popup/view-edit-notes/view-edit-notes.component';
import { AddNewNotesPopupComponent } from './modals/add-new-notes-popup/add-new-notes-popup.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { DateCreatedPipe } from './pipes/date-created.pipe';
import { ViewDocNotesComponent } from './modals/view-doc-notes/view-doc-notes.component';
import { HeaderFilterPipe } from './pipes/header-filter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NotesComponent,
    ViewEditNotesComponent,
    AddNewNotesPopupComponent,
    UserFilterPipe,
    DateCreatedPipe,
    ViewDocNotesComponent,
    HeaderFilterPipe,
  ],
  imports: [SharedModule],
  providers: [],
  exports: [
    NotesComponent,
    ViewEditNotesComponent,
    AddNewNotesPopupComponent,
    UserFilterPipe,
    DateCreatedPipe,
    HeaderFilterPipe,
  ],
})
export class NotesModule {}
