import { Injectable } from "@angular/core";
import { GeneralInfoGateway } from "@domain/gateways";
import { State } from "@domain/models";
import { Course } from "@domain/models/course.model";
import { College } from "@domain/models/dashboard.model";

@Injectable({providedIn: 'root'})
export class GeneralInfoUseCase{
    
    constructor(private _gateway: GeneralInfoGateway){

    }

    getStates = (): Promise<string[]> => this._gateway.getAllStates();
    getStatesAndCities = (): Promise<State[]> => this._gateway.getStatesAndCities();
    getColleges = (city: number): Promise<College[]> => this._gateway.getColleges(city);
    getCourses = (): Promise<Course[]> => this._gateway.getCourses();
}