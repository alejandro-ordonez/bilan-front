import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@application/auth/auth.service';
import { CoursesOptions } from '@domain/data';
import { gradeOptions } from '@domain/data/grades';
import { tribesOptions } from '@domain/data/tribes';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';
import { ClassRoom } from '@domain/models/classroom.model';
import { StudentDto } from '@domain/models/student.model';
import { TeacherDto } from '@domain/models/teacher.model';
import { User } from '@domain/models/user.model';
import { TeacherUseCase } from '@domain/usecases';

import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { StudentUseCase } from '@domain/usecases/student.usecase';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Option } from '@ui/components/select/select.component';

@Component({
  selector: 'panel-directivo',
  templateUrl: './panel-directivo.component.html',
  styleUrls: ['./panel-directivo.component.scss'],
})
export class PanelDirectivoComponent implements OnInit {
  @ViewChild('sureEnabledModal')
  private sureEnabledModalTpl: TemplateRef<any>;
  @ViewChild('updateProfileModal')
  private updateProfileModalTpl: TemplateRef<any>;

  userTypesFileUpload: Option[] = [
    {
      key: "StudentImport",
      value: 'Estudiantes',
    },
    {
      key: UserType.TeacherEnrollment,
      value: 'Vincular Profesores',
    },
  ];

  userInfo: User;
  students: StudentDto[];
  teachers: TeacherDto[];
  page: number = 1;
  totalPages: number = 1;
  partialDocument: string = '';
  showStudents = true;
  searchDocument = '';
  userSelected: StudentDto | TeacherDto;
  selectedCourse: any;

  uploadForm: FormGroup;
  editTeacherForm: FormGroup;
  editStudentForm: FormGroup;
  isValidFile: boolean = false;
  gradeCourses: any[] = [];
  grades: any[] = [];
  courses: Option[] = CoursesOptions;
  tribesOptions: Option[] = tribesOptions;
  gradeOptions: Option[] = gradeOptions;

  userInfoData: any;

  documentTypeOptions: Option[] = [
    {
      key: DocumentType.CC,
      value: 'Cédula de ciudadanía',
    },
    {
      key: DocumentType.CE,
      value: 'Cédula de extranjería',
    },
    {
      key: DocumentType.TI,
      value: 'Tarjeta de identidad',
    },
    {
      key: DocumentType.OT,
      value: 'Otro',
    },
  ];

  constructor(
    private userData: UserDataUseCase,
    private modal: NgbModal,
    private fb: FormBuilder,
    private dashboard: DashboardUseCase,
    private teacherData: TeacherUseCase,
    private studentData: StudentUseCase,
    private router: Router,
    private userService: AuthService
  ) {

    this.uploadForm = this.fb.group({
      file: ['', Validators.required],
    });
    //Update users
    this.editStudentForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required],
      course: ['', Validators.required],
    });
    this.editTeacherForm = this.fb.group({
      documentType: ['', Validators.required],
      document: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.searchStudents();
    this.getUserInfo();
  }

  addClassRoom(classRoom: ClassRoom): FormGroup {
    return this.fb.group({
      tribe: [classRoom.tribeId, Validators.required],
      grade: [classRoom.grade, Validators.required],
      course: [classRoom.courseId, Validators.required],
    });
  }

  get classRooms(): FormArray {
    return <FormArray>this.editTeacherForm.get('classRooms');
  }

  async getUserInfo() {
    const response = await this.userData.info();
    this.userInfo = response;
    this.userInfoData = await this.userData.searchTeacher(
      this.userInfo.document as string
    );
  }

  async searchStudents() {
    this.students = [];
    try {
      const response = await this.userData.searchStudents({
        page: Number(this.page - 1).toString(),
        document: this.partialDocument,
      });
      this.students = response.data;
      this.totalPages = response.npages;
    } catch (error) { }
  }

  async searchTeachers() {
    this.teachers = [];
    try {
      const response = await this.userData.searchTeachers({
        page: Number(this.page - 1).toString(),
        document: this.partialDocument,
      });
      this.teachers = response.data;
      this.totalPages = response.npages;
    } catch (error) { }
  }

  searchUsers() {
    this.showStudents ? this.searchStudents() : this.searchTeachers();
  }

  async getGrades() {
    const response = await this.dashboard.getGradeCourses(
      parseInt(this.userInfo.collegeId || '1')
    );
    this.gradeCourses = response;
    this.grades = this.gradeCourses.map((gc) => {
      return {
        key: gc.grade,
        value: gc.grade,
      };
    });
  }

  setShowStudents() {
    this.page = 1;
    this.showStudents = true;
    this.searchStudents();
  }

  setShowTeachers() {
    this.page = 1;
    this.showStudents = false;
    this.searchTeachers();
  }

  nextPage() {
    this.page++;
    this.searchUsers();
  }
  lastPage() {
    this.page--;
    this.searchUsers();
  }

   openUploads() {
    this.router.navigateByUrl("/admin/panel-uploads")
  }

  searchUser($event: any) {
    this.partialDocument = $event.target.value;
    this.searchUsers();
  }

  async onSubmitUpdate() {
    try {
      await this.update();
    } catch (error) {
      alert(error);
    }
  }

  updateTeacherForm() {
    this.editTeacherForm = this.fb.group({
      documentType: [this.userSelected.documentType, Validators.required],
      email: [this.userSelected.email, Validators.required],
      name: [this.userSelected.name, Validators.required],
      lastName: [this.userSelected.lastName, Validators.required],
      classRooms: this.fb.array([]),
    });
  }

  editUser(user: TeacherDto | StudentDto, student: boolean) {
    if (student) {
      this.userSelected = user as StudentDto;
    } else {
      this.userSelected = user as TeacherDto;
      this.updateTeacherForm();
      this.userSelected.classRoomDtoList.forEach((classRoom) => {
        this.classRooms.push(this.addClassRoom(classRoom));
      });
    }

    console.log(user);
    this.openModal(this.updateProfileModalTpl);
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 5) {
        this.uploadForm.value.file = file;
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        alert('Archivo muy grande, máximo 5MB');
        this.uploadForm.value.file = '';
      }
    }
  }

  async uploadFile() {
    try {
      this.isValidFile = false;
      const formData = new FormData();
      formData.append('file', this.uploadForm.value.file);

      await this.userData.loadDirectivo(
        this.uploadForm.value.userTypeLoad,
        formData
      );


      this.uploadForm.value.file = '';
      alert('Enviado con exito');
      this.router.navigateByUrl(
        `/admin/panel-directivo`
      );
    } catch {
      this.isValidFile = true;
      alert('Lo sentimos hubo un error, inténtelo más tarde');
    }
  }

  selectUser(user: any, enabled: boolean) {
    this.userSelected = user;

    this.openModal(this.sureEnabledModalTpl);
  }

  async changeEnabled() {
    this.userSelected.isEnabled = !this.userSelected.isEnabled;

    await this.userData.enableUser({
      document: this.userSelected.document || '',
      documentType: this.userSelected.documentType || DocumentType.CC,
      enabled: this.userSelected.isEnabled,
    });

    this.searchUsers();
  }

  async update() {
    try {
      if (this.editStudentForm.value.document == '') {
        delete this.editStudentForm.value.document
      }
      if (this.editStudentForm.value.documentType == '') {
        delete this.editStudentForm.value.documentType
      }
      if (this.editStudentForm.value.password == '') {
        delete this.editStudentForm.value.password
      }
      if (this.editStudentForm.value.name == '') {
        delete this.editStudentForm.value.name
      }
      if (this.editStudentForm.value.lastName == '') {
        delete this.editStudentForm.value.lastName
      }
      if (this.editStudentForm.value.email == '') {
        delete this.editStudentForm.value.email
      }
      if (this.editStudentForm.value.grade == '') {
        delete this.editStudentForm.value.grade
      }
      if (this.editStudentForm.value.courses == '') {
        delete this.editStudentForm.value.courses
      }

      if (this.showStudents) {
        const FormatDocument = this.editStudentForm.value.documentType.slice(3, 5) || this.editStudentForm.value.documentType
        await this.studentData.update({
          document: this.editStudentForm.value.document || this.userSelected.document,
          documentType: FormatDocument,
          name: this.editStudentForm.value.name,
          lastName: this.editStudentForm.value.lastName,
          email: this.editStudentForm.value.email,
          grade: this.editStudentForm.value.grade,
          course: this.editStudentForm.value.course,
        });
      } else {
        const teacher = this.userSelected as TeacherDto;
        console.log(teacher, "TEACHER");
        const FormatDocument = this.editTeacherForm.value.documentType.slice(3, 5) || this.editTeacherForm.value.documentType
        await this.teacherData.update({
          document: this.userSelected.document,
          documentType: FormatDocument,
          name: this.editTeacherForm.value.name,
          lastName: this.editTeacherForm.value.lastName,
          email: this.editTeacherForm.value.email,
          grade: this.editTeacherForm.value.grade,
          course: this.editTeacherForm.value.course,
          codDane: this.userSelected.codDane || '',
          codDaneMinResidencia: teacher.codDaneMinResidencia || '',
          codDaneSede: teacher.codDaneSede || '',
          classRoomDtoList: this.classRooms.value,
        });
      }

      alert('Usuario actualizado con exito');
    } catch (error) {
      alert('Lo sentimos hubo un error');
    }
  }
}
