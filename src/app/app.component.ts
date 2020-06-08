import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsername = ['Gagi', 'Vlado'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls
  }

  onAddHobby() { 
    this.getControls();  
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsername.indexOf(control.value) != -1){
      // -1 je stavljeno, jer smo gore definsali zabranjena/zauzeta imena, tako da ako bi ukucali taj user, 
      // u inspectu bi uocili da je id => invalid , sto znaci da ne bi prolazilo za nalog 
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
