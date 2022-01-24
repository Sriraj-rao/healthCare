import { Injectable } from '@angular/core';
import { InsuredDetailsModel } from 'src/app/shared/models/insured-details.model';
import { PolicyAccountDetails } from 'src/app/shared/models/policy-account-details.model';
import { ClaimsDetailsModel } from 'src/app/shared/models/claims-details.model';
import { DocumentRequestStateDetails } from 'src/app/shared/models/document-request-details.model';
import { MiscDocumentDetails } from 'src/app/shared/models/misc-doc-details.model';
import { AttachedClaimsDetails } from 'src/app/shared/models/attached-claims-details.model';
import { InvestigationDetailsModel } from 'src/app/shared/models/investigations-details.model';
import { NotesDetailsModel } from 'src/app/shared/models/notes-details.model';
import { InvestigationTabDetails } from 'src/app/shared/models/investigation-tab-details.model';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  insuredDetails: InsuredDetailsModel = null;
  policyDetails: PolicyAccountDetails = null;
  claimsDetatils: ClaimsDetailsModel = null;
  docRequestDetails: DocumentRequestStateDetails[] = [];
  miscDocDetails: MiscDocumentDetails[] = [];
  claimsAttachedDetails: AttachedClaimsDetails[] = [];
  investigationDetails: InvestigationDetailsModel = null;
  notesDetails: NotesDetailsModel = null;
  investigationTabDetails: InvestigationTabDetails = null;
  constructor() { }

  setInsuredDetails(insuredDetails: InsuredDetailsModel) {
    this.insuredDetails = insuredDetails;
  }

  getInsuredDetails() {
    if (!this.insuredDetails || this.insuredDetails === null) {
      return null;
    }
    else {
      return this.insuredDetails;
    }
  }

  setClaimDetails(claimsDetatils: ClaimsDetailsModel) {
    this.claimsDetatils = claimsDetatils;
  }

  getClaimDetails() {
    if (!this.claimsDetatils || this.claimsDetatils === null) {
      return null;
    }
    else {
      return this.claimsDetatils;
    }
  }

  setPolicyDetails(policyDetails: PolicyAccountDetails) {
    this.policyDetails = policyDetails;
  }

  getPolicyDetails() {
    if (!this.policyDetails || this.policyDetails === null) {
      return null;
    }
    else {
      return this.policyDetails;
    }
  }

  setInvestigationDetails(investigationDetails: InvestigationDetailsModel) {
    this.investigationDetails = investigationDetails;
  }

  getInvestigationDetails() {
    if (!this.investigationDetails || this.investigationDetails === null) {
      return null;
    }
    else {
      return this.investigationDetails;
    }
  }

  setInvestigationTabDetails(investigationDetails: InvestigationTabDetails) {
    this.investigationTabDetails = investigationDetails;
  }

  getInvestigationTabDetails() {
    if (!this.investigationTabDetails || this.investigationTabDetails === null) {
      return null;
    }
    else {
      return this.investigationTabDetails;
    }
  }

  setNotesDetails(notesDetails: NotesDetailsModel) {
    this.notesDetails = notesDetails;
  }

  getNotesDetails() {
    if (!this.notesDetails || this.notesDetails === null) {
      return null;
    }
    else {
      return this.notesDetails;
    }
  }

  setDocumentRequestDetails(docRequestDetails: DocumentRequestStateDetails) {
    this.docRequestDetails.push(docRequestDetails);
  }

  getDocumentRequestDetails() {
    if (!this.docRequestDetails || this.docRequestDetails === null) {
      return null;
    }
    else {
      return this.docRequestDetails;
    }
  }

  setMiscDocumentDetails(miscDocDetails: MiscDocumentDetails) {
    this.miscDocDetails.push(miscDocDetails);
  }

  getMiscDocumentDetails() {
    if (!this.miscDocDetails || this.miscDocDetails === null) {
      return null;
    }
    else {
      return this.miscDocDetails;
    }
  }

  setAttachedClaimsDetails(claimsAttachedDetails: AttachedClaimsDetails) {
    this.claimsAttachedDetails.push(claimsAttachedDetails);
  }

  getAttachedClaimsDetails() {
    if (!this.claimsAttachedDetails || this.claimsAttachedDetails === null) {
      return null;
    }
    else {
      return this.claimsAttachedDetails;
    }
  }

  setAllInvDetailsToEmpty() {
    this.claimsAttachedDetails = [];
    this.docRequestDetails = [];
    this.miscDocDetails = [];
  }
}
