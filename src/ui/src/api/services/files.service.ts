import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { ApiConfiguration } from "../api-configuration";
import { BaseService } from "../base-service";
import { GetFilesRequest, PostFileRequest, PostFileResponse } from "../models";
import { File } from "../models/file"
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
     * Path part for operation apiFleetsGet
     */
    static readonly ApiFilesGetPath = '/api/files';

    /**
     * Gets a list of files.
     *
     *
     *
     * 
     * 
     *
     * 
     */

    apiFilesGet(params?: {
        request?: GetFilesRequest;
    }): File[] {
        return [
            { id: 1, fileName: 'File 1', stringJSON: '{}' } as File,
            { id: 2, fileName: 'File 2', stringJSON: '{}' } as File,
            { id: 3, fileName: 'File 3', stringJSON: '{}' } as File,
            { id: 4, fileName: 'File 4', stringJSON: '{}' } as File,
        ]
    }

    apiFilesPost(params?: {
        request?: PostFileRequest
    }): Observable<StrictHttpResponse<PostFileResponse>> {
        const rb = new RequestBuilder(this.rootUrl, FileService.ApiFilesGetPath, 'post')
        if (params?.request?.file) {
            rb.query('file', params.request.file, {})
        }

        return this.http.request(rb.build({
            responseType: 'text',
            accept: 'text/plain'
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<PostFileResponse>;
            })
        );
    }

}