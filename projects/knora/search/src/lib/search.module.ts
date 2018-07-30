import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatListModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KuiCoreModule } from '@knora/core';
import { KuiActionModule } from '@knora/action';


import { SearchComponent } from './search.component';
import { SelectOntologyComponent } from './extended-search/select-ontology/select-ontology.component';
import { ExtendedSearchComponent } from './extended-search/extended-search.component';
import { SelectResourceClassComponent } from './extended-search/select-resource-class/select-resource-class.component';
import { SelectPropertyComponent } from './extended-search/select-property/select-property.component';
import { SpecifyPropertyValueComponent } from './extended-search/select-property/specify-property-value/specify-property-value.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        KuiCoreModule,
        KuiActionModule
    ],
    declarations: [
        SearchComponent,
        SelectOntologyComponent,
        ExtendedSearchComponent,
        SelectResourceClassComponent,
        SelectPropertyComponent,
        SpecifyPropertyValueComponent
    ],
    exports: [SearchComponent]
})
export class KuiSearchModule {
}
