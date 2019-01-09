import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiServiceResult, CountQueryResult, KuiCoreConfig, ReadResourcesSequence } from '../../declarations';
import { ConvertJSONLD } from './convert-jsonld';
import { map, mergeMap } from 'rxjs/operators';
import { OntologyCacheService, OntologyInformation } from './ontology-cache.service';
import { HttpClient } from '@angular/common/http';

/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
@Injectable({
    providedIn: 'root',
})
export class SearchService extends ApiService {

    constructor(public http: HttpClient,
                @Inject('config') public config: KuiCoreConfig,
                private _ontologyCacheService: OntologyCacheService) {
        super(http, config);
    }

    /**
     * Converts a JSON-LD object to a `ReadResorceSequence`.
     * To be passed as a function pointer (arrow notation required).
     *
     * @param {Object} resourceResponse
     * @returns {Observable<ReadResourcesSequence>}
     */
    private convertJSONLDToReadResourceSequence: (resourceResponse: Object) => Observable<ReadResourcesSequence> = (resourceResponse: Object) => {
        // convert JSON-LD into a ReadResourceSequence
        const resSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);

        // collect resource class Iris
        const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);

        // request information about resource classes
        return this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(
            map(
                (ontoInfo: OntologyInformation) => {
                    // add ontology information to ReadResourceSequence
                    resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                    return resSeq;
                }
            )
        );
    };

    /**
     * Performs a fulltext search.
     * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearch(searchTerm: string, offset: number = 0): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }

        return this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);
    }

    /**
     * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    doFullTextSearchReadResourceSequence(searchTerm: string, offset: number = 0): Observable<ReadResourcesSequence> {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }

        const res: Observable<any> = this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);

        return res.pipe(
            mergeMap(
                // this would return an Observable of a PromiseObservable -> combine them into one Observable
                this.processJSONLD
            ),
            mergeMap(
                // return Observable of ReadResourcesSequence
                this.convertJSONLDToReadResourceSequence
            )
        );
    }

    /**
     * Performs a fulltext search count query.
     * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
     *
     * @param searchTerm the term to search for.
     * @returns Observable<ApiServiceResult>
     */
    doFulltextSearchCountQuery(searchTerm: string): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }

        return this.httpGet('/v2/search/count/' + searchTerm);
    }

    /**
     * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
     *
     * @param {string} searchTerm the term to search for.
     * @returns Observable<CountQueryResult>
     */
    doFullTextSearchCountQueryCountQueryResult(searchTerm: string): Observable<CountQueryResult> {

        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }

        const res = this.httpGet('/v2/search/count/' + searchTerm);

        return res.pipe(
            mergeMap(
                // this would return an Observable of a PromiseObservable -> combine them into one Observable
                this.processJSONLD
            ),
            map(
                // convert to a `CountQueryResult`
                ConvertJSONLD.createCountQueryResult
            )
        );
    }

    /**
     * Performs an extended search.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearch(gravsearchQuery: string): Observable<ApiServiceResult> {

        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }

        return this.httpPost('/v2/searchextended', gravsearchQuery);
    }

    /**
     * Performs an extended search and turns the result into a `ReadResourceSequence`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchReadResourceSequence(gravsearchQuery: string): Observable<ReadResourcesSequence> {

        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }

        const res = this.httpPost('/v2/searchextended', gravsearchQuery);

        return res.pipe(
            mergeMap(
                this.processJSONLD
            ),
            mergeMap(
                this.convertJSONLDToReadResourceSequence
            )
        );
    }

    /**
     * Performs an extended search count query.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQuery(gravsearchQuery: string): Observable<ApiServiceResult> {

        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }

        return this.httpPost('/v2/searchextended/count', gravsearchQuery);
    }

    /**
     * Performs an extended search count query and turns the result into a `CountQueryResult`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    doExtendedSearchCountQueryCountQueryResult(gravsearchQuery: string): Observable<CountQueryResult> {

        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }

        const res = this.httpPost('/v2/searchextended/count', gravsearchQuery);

        return res.pipe(
            mergeMap(
                // this would return an Observable of a PromiseObservable -> combine them into one Observable
                this.processJSONLD
            ),
            map(
                // convert to a `CountQueryResult`
                ConvertJSONLD.createCountQueryResult
            )
        );
    }

    /**
     * Perform a search by a resource's rdfs:label.
     * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabel(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }

        const params = {};

        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }

        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }

        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), params);

    }

    /**
     * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    searchByLabelReadResourceSequence(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ReadResourcesSequence> {

        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }

        const params = {};

        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }

        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }

        const res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), params);

        return res.pipe(
            mergeMap(
                this.processJSONLD
            ),
            mergeMap(
                this.convertJSONLDToReadResourceSequence
            )
        );
    }
}
