import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EligibilityRequest {
    fullName: string;
    age: number;
    countryPreference: string;
    highestEducation: string;
    occupation: string;
    workExperience: number;
    email: string;
    phone: string;
    ieltsScore?: string;
}

@Injectable({
    providedIn: 'root'
})
export class EligibilityService {

    private apiUrl = 'https://localhost:7051/api/Eligibility';

    constructor(private http: HttpClient) { }

    submitEligibility(
        request: EligibilityRequest
    ): Observable<any> {

        return this.http.post<any>(
            this.apiUrl,
            request
        );
    }
}