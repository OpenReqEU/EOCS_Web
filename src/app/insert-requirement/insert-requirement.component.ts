import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { RequirementsService } from '../requirements.service';

@Component({
  selector: 'app-insert-requirement',
  templateUrl: './insert-requirement.component.html',
  styleUrls: ['./insert-requirement.component.css']
})
export class InsertRequirementComponent implements OnInit {

  form: FormGroup;
  account = "";
  selectProjectForm;
  accounts;

  constructor(private requirementService : RequirementsService) {
    this.selectProjectForm= new FormGroup({
      selectedAccount: new FormControl('')
    });
    this.form= new FormGroup({
      new_requirement: new FormControl('')
    });
   }

  ngOnInit() {
    this.getProjects();
  }

  insertRequirement(){
    this.requirementService.insertRequirement(this.account, this.form.value.new_requirement).subscribe(
      data => console.log("Added"), err => console.log("Error "+err));
  }

  accountChange(value){
    this.account = value.substring(value.indexOf(' ')+ 1,value.length);
    console.log(this.account);
  }

  getProjects(){
    this.requirementService.getProjects().subscribe(apiData => {
      this.accounts = apiData;
      if(this.accounts !== null && this.accounts.length > 0){
        var account_name = this.accounts[0].account_name;
        this.selectProjectForm.controls['selectedAccount'].setValue(account_name, { onlySelf: true });
      }
    });
  }

}