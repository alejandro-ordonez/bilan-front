import { Injectable } from "@angular/core";
import { GeneralInfoGateway } from "@domain/gateways";
import { City } from "@domain/models/city.model";
import { Course } from "@domain/models/course.model";
import { College } from "@domain/models/dashboard.model";

@Injectable({providedIn: 'root'})
export class GeneralInfoUseCase{
    
    constructor(private _gateway: GeneralInfoGateway){

    }

    getStates = (): Promise<string[]> => this._gateway.getAllStates();
    getCities = (state: string): Promise<City[]> => this._gateway.getCitiesByState(state);
    getColleges = (city: number): Promise<College[]> => this._gateway.getColleges(city);
    getCourses = (): Promise<Course[]> => this._gateway.getCourses();
}