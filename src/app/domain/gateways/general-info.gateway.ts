import { City } from "@domain/models/city.model";
import { Course } from "@domain/models/course.model";
import { College } from "@domain/models/dashboard.model";

export abstract class GeneralInfoGateway{
    

    abstract getAllStates(): Promise<string[]>;
    abstract getCitiesByState(state: string): Promise<City[]>;
    abstract getColleges(cityId: number): Promise<College[]>;
    abstract getCourses(): Promise<Course[]>;

}