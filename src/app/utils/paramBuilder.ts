import { Params } from "@angular/router";

export const buildStateStatisticsParams = (state: string): Params => {
    return {
        State: state
    }
}

export const buildCityStatisticsParams = (cityId: number | string): Params => {
    return {
        CityId: cityId
    }
}

export const buildCollegetatisticsParams = (collegeId: number | string): Params => {
    return {
        CollegeId: collegeId
      };
}

export const buildCourseStatisticsParams = (collegeId: number | string, course: string): Params => {
    return {
        ...buildCollegetatisticsParams(collegeId),
        Course: course
    }
}

export const buildUserStatisticsParams = (document: string): Params => {
    return {
        Document: document
    }
}