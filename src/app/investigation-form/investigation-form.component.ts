import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cwb-investigation-form',
  templateUrl: './investigation-form.component.html',
  styleUrls: ['./investigation-form.component.scss']
})
export class InvestigationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, ) { }

  selectedAppDate: Date;
  selectedVCallDate: Date;
  InvForm: FormGroup;


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.InvForm = this.formBuilder.group({
      appDate: [{ value: new Date() }, Validators.required],
      VCallDate: [{ value: new Date() }, Validators.required],
      infoDisclosed: [null, Validators.required],
      apDr: [null, Validators.required],
      aps: [null, Validators.required],
      carrierName: [null, Validators.required],
      exclusionRider: [null, Validators.required],
      apsYes: [null, Validators.required],
      apsNo: [null, Validators.required],
      priorYes: [null, Validators.required],
      priorNo: [null, Validators.required],
      standardYes: [null, Validators.required],
      standardNo: [null, Validators.required],
      dr: [null]


    });
}
onSubmit()
{
}


onClear(){
  this.InvForm.reset();
}

  onSelectedAppDate($event){
    this.selectedAppDate = new Date($event);
  }

  onSelectedVCallDate($event)
  {
    this.selectedVCallDate = new Date($event);

  }

}
