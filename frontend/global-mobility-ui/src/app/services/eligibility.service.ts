import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

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

export interface EligibilityRecord {
    id: number;
    fullName: string;
    age: number;
    countryPreference: string;
    highestEducation: string;
    occupation: string;
    workExperience: number;
    email: string;
    phone: string;
    ieltsScore?: string;
    resumeUrl?: string;
    status: string;
    createdOn: string;
}

@Injectable({
    providedIn: 'root'
})
export class EligibilityService {

    // Public API
    private apiUrl =
        `${environment.apiUrl}/Eligibility`;

    // Admin API
    private adminApiUrl =
        `${environment.apiUrl}/admin/eligibilities`;

    constructor(
        private http: HttpClient
    ) {}


    // ==========================================
    // PUBLIC - SUBMIT ELIGIBILITY FORM
    // ==========================================

    submitEligibility(
        request: EligibilityRequest
    ): Observable<any> {

        return this.http.post<any>(
            this.apiUrl,
            request
        );
    }


    // ==========================================
    // ADMIN - GET ENQUIRIES
    // ==========================================

    getEnquiries(
        name?: string,
        phone?: string,
        email?: string,
        status?: string
    ): Observable<EligibilityRecord[]> {

        let params = new HttpParams();

        if (name) {
            params = params.set('name', name);
        }

        if (phone) {
            params = params.set('phone', phone);
        }

        if (email) {
            params = params.set('email', email);
        }

        if (status) {
            params = params.set('status', status);
        }

        return this.http.get<EligibilityRecord[]>(
            this.adminApiUrl,
            { params }
        );
    }


    // ==========================================
    // ADMIN - UPDATE STATUS
    // ==========================================

    updateStatus(
        id: number,
        status: string
    ): Observable<any> {

        return this.http.put<any>(
            `${this.adminApiUrl}/${id}/status`,
            {
                status: status
            }
        );
    }


    // ==========================================
    // ADMIN - EXPORT EXCEL
    // ==========================================

    exportEnquiries(
        name?: string,
        phone?: string,
        email?: string,
        status?: string
    ): Observable<Blob> {

        let params = new HttpParams();

        if (name) {
            params = params.set('name', name);
        }

        if (phone) {
            params = params.set('phone', phone);
        }

        if (email) {
            params = params.set('email', email);
        }

        if (status) {
            params = params.set('status', status);
        }

        return this.http.get(
            `${this.adminApiUrl}/export`,
            {
                params: params,
                responseType: 'blob'
            }
        );
    }

}