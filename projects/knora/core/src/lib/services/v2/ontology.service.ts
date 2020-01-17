import { Injectable } from '@angular/core';
import { Constants } from '@knora/api';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiServiceResult } from '../../declarations/api-service-result';
import { NewOntology } from '../../declarations/api/v2/ontology/new-ontology';
import { NewProperty } from '../../declarations/api/v2/ontology/new-property';
import { NewResourceClass } from '../../declarations/api/v2/ontology/new-resource-class';
import { ApiService } from '../api.service';

/**
 * @deprecated since v10.0.0
 *
 * Will be replaced by `@knora/api` (github:knora-api-js-lib)
 * Requests ontology information from Knora.
 */
@Injectable({
    providedIn: 'root',
})
export class OntologyService extends ApiService {


    // ------------------------------------------------------------------------
    // GET list of ontologies
    // ------------------------------------------------------------------------

    /**
     * @deprecated: Use **getAllOntologies()** instead
     *
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    getOntologiesMetadata(): Observable<ApiServiceResult> {
        return this.httpGet('/v2/ontologies/metadata');
    }

    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    getAllOntologies(): Observable<ApiServiceResult> {
        return this.httpGet('/v2/ontologies/metadata');
    }

    /**
     * Requests the ontologies of a specific project
     *
     * @param projectIri
     * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
     */
    getProjectOntologies(projectIri: string): Observable<ApiServiceResult> {
        return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
    }


    // ------------------------------------------------------------------------
    // GET ontology
    // ------------------------------------------------------------------------

    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    getAllEntityDefinitionsForOntologies(ontologyIri: string): Observable<ApiServiceResult> {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    }

    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
     */
    getResourceClasses(resourceClassIris: Array<string>): Observable<ApiServiceResult> {

        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'));
        }

        let resClassUriEnc = '';

        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });

        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    }

    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
     */
    getProperties(propertyIris: string[]): Observable<ApiServiceResult> {

        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No property Iris given for call of OntologyService.getProperties'));
        }

        let propertiesUriEnc = '';

        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });

        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);

    }

    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------

    /**
     * Create new ontology.
     *
     * @param {NewOntology} data Data contains: projectIri, name, label
     * @returns Observable<ApiServiceResult> incl. ontolog iri and knora-api:lastModificationDate
     */
    createOntology(data: NewOntology): Observable<ApiServiceResult> {
        const path = '/v2/ontologies';

        const ontology = {
            'knora-api:ontologyName': data.name,
            'knora-api:attachedToProject': {
                '@id': data.projectIri,
            },
            'rdfs:label': data.label,
            '@context': {
                'rdfs': Constants.Rdfs + Constants.Delimiter,
                'knora-api': Constants.KnoraApiV2 + Constants.Delimiter
            }
        };

        return this.httpPost(path, ontology).pipe(
            map((result: ApiServiceResult) => result.body),
            catchError(this.handleJsonError)
        );
    }
    /**
     * Add resource class to ontology
     *
     * @param  {json-ld} ontology
     * @param  {NewResourceClass} data
     * @returns Observable<ApiServiceResult>
     */
    addResourceClass(ontology: any, data: NewResourceClass): Observable<ApiServiceResult> {
        const path = '/v2/ontologies/classes';

        // get name from ontology
        const ontoName = this.getOntologyName(ontology['@id']);
        // get class name from label
        const className = this.camelize(data.label);
        // set comment; if empty or undefined use the label
        const comment = (data.comment ? data.comment : data.label);

        const resourceClass = {
            '@id': ontology['@id'],
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': ontology['knora-api:lastModificationDate'],
            '@graph': [{
                '@id': ontoName + ':' + className,
                '@type': 'owl:Class',
                'rdfs:label': data.label,
                'rdfs:comment': comment,
                'rdfs:subClassOf': {
                    '@id': data.subClassOf
                }
            }],
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                [ontoName]: ontology['@id'] + '#'
            }
        };

        return this.httpPost(path, resourceClass).pipe(
            map((result: ApiServiceResult) => result.body),
            catchError(this.handleJsonError)
        );

    }

    addProperty(ontology: any, data: NewProperty[]): Observable<ApiServiceResult> {
        const path = '/v2/ontologies/properties';

        // get name from ontology
        const ontoName = this.getOntologyName(ontology['@id']);

        const graph = [];

        for (const prop of data) {
            // get class name from label
            const propName = this.camelize(prop.label);
            // set comment; if empty or undefined use the label
            const comment = (prop.comment ? prop.comment : prop.label);

            const prop_obj = {
                [ontoName + ':' + propName]: {
                    '@id': ontoName + ':' + propName,
                    '@type': 'owl:ObjectProperty',
                    'rdfs:label': prop.label,
                    'rdfs:comment': comment,
                    'knora-api:objectType': {
                        '@id': prop.subPropertyOf
                    },
                    'knora-api:subjectType': {
                        '@id': 'Notizblogg:buch'
                    },

                    'rdfs:subPropertyOf': {
                        '@id': 'knora-api:hasValue'
                    },
                    'salsah-gui:guiElement': {
                        '@id': prop.guiElement
                    }
                }
            };
            graph.push(prop_obj);
        }

        const property = {
            '@id': ontology['@id'],
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': ontology['knora-api:lastModificationDate'],
            '@graph': graph,
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'salsah-gui': 'http://api.knora.org/ontology/salsah-gui/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                [ontoName]: ontology['@id'] + '#'
            }
        };

        console.log(JSON.stringify(property));

        return this.httpPost(path, property).pipe(
            map((result: ApiServiceResult) => result.body),
            catchError(this.handleJsonError)
        );

    }

    setCardinality(data: any): Observable<ApiServiceResult> {
        const path = '/v2/ontologies/cardinalities';

        // TODO: add the following values to parameter
        let class_iri: string;
        let prop_iri: string;

        let onto_iri: string;
        let onto_name: string;
        let last_onto_date: string;

        // TODO: find a way with typescript for the following python construct

        const occurrences = {
            '1': ['owl:cardinality', 1],
            '0-1': ['owl:maxCardinality', 1],
            '0-n': ['owl:minCardinality', 0],
            '1-n': ['owl:minCardinality', 1]
        };

        const cardinality = {
            '@id': onto_iri,
            '@type': 'owl:Ontology',
            'knora-api:lastModificationDate': last_onto_date,
            '@graph': [{
                '@id': class_iri,
                '@type': 'owl:Class',
                'rdfs:subClassOf': {
                    '@type': 'owl:Restriction',
                    [occurrences[data.occurrence][0]]: occurrences[data.occurrence][1],
                    'owl:onProperty': {
                        '@id': prop_iri
                    }
                }
            }],
            '@context': {
                'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'knora-api': 'http://api.knora.org/ontology/knora-api/v2#',
                'owl': 'http://www.w3.org/2002/07/owl#',
                'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xsd': 'http://www.w3.org/2001/XMLSchema#',
                onto_name: onto_iri + '#'
            }
        };

        return this.httpPost(path, cardinality).pipe(
            map((result: ApiServiceResult) => result.body),
            catchError(this.handleJsonError)
        );
    }



    /**
     * Gets the ontolgoy name from ontology iri
     *
     * @param  {string} iri
     * @returns string
     */
    private getOntologyName(iri: string): string {

        const array = iri.split('/');

        const pos = array.length - 2;

        return array[pos].toLowerCase();
    }

    /**
     * Convert string into camel case
     * @param  {string} str
     * @returns string
     */
    private camelize(str: string): string {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

}
