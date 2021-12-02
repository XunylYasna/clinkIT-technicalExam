import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { ApiConfiguration } from "../api-configuration";
import { BaseService } from "../base-service";
import { GetFilesRequest, GetFilesResponse, PostFileRequest, PostFileResponse } from "../models";
import { RequestBuilder } from "../request-builder";
import { StrictHttpResponse } from "../strict-http-response";


@Injectable({
    providedIn: 'root'
})

export class FileService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

    /**
     * Path part for operation apiFilesGet
     */
    static readonly ApiFilesGetPath = '/api/files';

    /**
   * Gets a list of Files.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiFilesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
    apiFilesGet$Plain$Response(params?: {
        request?: GetFilesRequest;
    }): Observable<StrictHttpResponse<GetFilesResponse>> {

        const rb = new RequestBuilder(this.rootUrl, FileService.ApiFilesGetPath, 'get');
        if (params) {
            rb.query('request', params.request, {});
        }

        return this.http.request(rb.build({
            responseType: 'text',
            accept: 'text/plain'
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<GetFilesResponse>;
            })
        );
    }

    /**
     * Gets a list of Files.
     *
     *
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `apiFilesGet$Plain$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    apiFilesGet$Plain(params?: {
        request?: GetFilesRequest;
    }): Observable<GetFilesResponse> {

        return this.apiFilesGet$Plain$Response(params).pipe(
            map((r: StrictHttpResponse<GetFilesResponse>) => r.body as GetFilesResponse)
        );
    }

    /**
     * Gets a list of Files.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `apiFilesGet$Json()` instead.
     *
     * This method doesn't expect any request body.
     */
    apiFilesGet$Json$Response(params?: {
        request?: GetFilesRequest;
    }): Observable<StrictHttpResponse<GetFilesResponse>> {

        const rb = new RequestBuilder(this.rootUrl, FileService.ApiFilesGetPath, 'get');
        if (params) {
            rb.query('request', params.request, {});
        }

        return this.http.request(rb.build({
            responseType: 'json',
            accept: 'text/json'
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<GetFilesResponse>;
            })
        );
    }

    /**
     * Gets a list of Files.
     *
     *
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `apiFilesGet$Json$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    apiFilesGet$Json(params?: {
        request?: GetFilesRequest;
    }): Observable<GetFilesResponse> {

        return this.apiFilesGet$Json$Response(params).pipe(
            map((r: StrictHttpResponse<GetFilesResponse>) => r.body as GetFilesResponse)
        );
    }

    apiFilesPost(params: {
        request: PostFileRequest
    }): Observable<StrictHttpResponse<PostFileResponse>> {

        // const rb = new RequestBuilder(this.rootUrl, FileService.ApiFilesGetPath + '/submit', 'post')
        // if (params?.request?.Name && params?.request?.Contents) {
        //     rb.body({
        //         Name: params.request.Name,
        //         Content: params.request.Contents
        //     }, 'application/json');
        //     console.log(params.request)
        // }


        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };



        // curl -k -X POST -H "Content-type:application/json" --data "{\"Name\": \"testCurl\", \"Content\": \"content\"}" https://localhost:5001/api/files/submit

        const apiUrl = this.rootUrl + FileService.ApiFilesGetPath + '/submit'
        return this.http.post(apiUrl, {
            Name: params.request.Name,
            Content: params.request.Contents
        }, httpOptions).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<PostFileResponse>;
            })
        );
    }

}