import { Component, OnInit } from '@angular/core';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';
import { CompaniesDropdownModel, RequestTypeDropdownModel } from 'src/app/investigations/models/doc-rquest-dropdowns.model';
import { DocumentService } from 'src/app/investigations/services/document.service';

@Component({
  selector: 'cwb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selectedTab: number;
  companies: CompaniesDropdownModel[];
  docTypes: RequestTypeDropdownModel[];
  
  constructor(private docService: DocumentService,private detailsSharing: DetailsSharingService) { 
    this.detailsSharing.reloadAdminScreen.subscribe(response => {
      if (response){
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.getAllCompanies();
    this.getAllRequestTypes();
  }

  tabSelectionChanged($event) {
    this.selectedTab = $event;
  }

  getAllCompanies() {
    this.docService.getAllCompanies().subscribe((response) => {
      if (response.data) {
        this.companies = response.data;
      }
    });
  }

  getAllRequestTypes() {
    this.docService.getAllRequestTypes(false).subscribe((response) => {
      this.docTypes = response.data;
      this.getAllRequestTypesTrue();
    });
  }

  getAllRequestTypesTrue() {
    this.docService.getAllRequestTypes(true).subscribe((response) => {
      this.docTypes = [...this.docTypes,...response.data];
    });
  }

}
