import { College, Course, State } from "@domain/models";

export abstract class GeneralInfoGateway{
    

    abstract getAllStates(): Promise<string[]>;
    abstract getStatesAndCities(): Promise<State[]>;
    abstract getColleges(cityId: number): Promise<College[]>;
    abstract getCourses(): Promise<Course[]>;

}