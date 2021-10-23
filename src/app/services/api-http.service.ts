import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataModel } from '../models/ApiDataModel';

@Injectable()
export class ApiHttpService {

    private apiUrl: string = 'http://api.mediastack.com/v1/news?access_key=a698fe36aa4a280c7635c5fedb167f37';

    constructor(
        private http: HttpClient
    ) { }

    public getNews(params:HttpParams) {
        return this.http.get<DataModel>(this.apiUrl,{params: params});
    }
}