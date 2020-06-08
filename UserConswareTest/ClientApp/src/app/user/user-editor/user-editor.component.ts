import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

    title: string;
    userForm: FormGroup;
    user: User;
    imgPreview: any;
    fileSelected: File;
    processing: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private sanitizer: DomSanitizer,
        @Inject('BASE_URL') private baseUrl: string) { }

    ngOnInit() {
        this.buildForm();

        this.route.paramMap
            .subscribe(data => {
                let id = +data.get('id');
                if (id) {
                    this.title = "Editar Usuario";
                    this.getUser(id);
                }
                else {
                    this.title = "Crear Usuario";
                    this.imgPreview = '/assets/img/no-img.jpg';
                }
            });
    }

    getUser(id: number) {
        this.userService.getUser(id)
            .subscribe(data => {
                this.user = data;
                console.log(this.user);
                this.imgPreview = `${this.baseUrl}uploads/${this.user.avatar}`;
                this.userForm.patchValue({
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    birthDate: formatDate(this.user.birthDate, 'yyyy-MM-dd', 'en'),
                    userName: this.user.userName
                });
            });
    }

    buildForm() {
        this.userForm = new FormGroup({
            'firstName': new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(100)
            ]),
            'lastName': new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(100)
            ]),
            'birthDate': new FormControl(null, Validators.required),
            'avatar': new FormControl(null),
            'userName': new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50)
            ]),
            // 'alterEgo': new FormControl(this.hero.alterEgo, {
            //   asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
            //   updateOn: 'blur'
            // }),
            // 'power': new FormControl(this.hero.power, Validators.required)
        });
    }

    get firstName() { return this.userForm.get('firstName'); }

    get lastName() { return this.userForm.get('lastName'); }

    get birthDate() { return this.userForm.get('birthDate'); }

    get avatar() { return this.userForm.get('avatar'); }

    get userName() { return this.userForm.get('userName'); }

    onFileSelected(event) {
        this.fileSelected = event.target.files[0];
        let blob = URL.createObjectURL(this.fileSelected);
        this.imgPreview = this.sanitizer.bypassSecurityTrustUrl(blob);
    }

    save() {
        this.processing = true;
        const formData = new FormData();

        formData.append("id", this.user ? this.user.id.toString() : '0');
        formData.append('firstName', this.firstName.value);
        formData.append('lastName', this.lastName.value);
        formData.append('birthDate', this.birthDate.value);

        if (this.fileSelected) {
            formData.append('avatar', this.fileSelected);
        }

        formData.append('userName', this.userName.value);

        const urlSubscription$ = this.user ?
            this.userService.updateUser(this.user.id, formData) :
            this.userService.createUser(formData);

        urlSubscription$
            .subscribe(result => {
                this.goToUsers();
                this.processing = false;
            });
    }

    goToUsers() {
        this.router.navigate(['/users']);
    }

}
