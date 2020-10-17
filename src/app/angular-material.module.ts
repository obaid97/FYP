
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import { MatChipInputEvent } from '@angular/material/chips';
//import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
//import { MaterialFileInputModule } from 'ngx-material-file-input';
@NgModule({
/*imports: [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule
],*/
//Angular provide an optimization technique by just exporting these modules they will automatically be imported...
exports: [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatStepperModule,
  MatGridListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatAutocompleteModule,
  // MaterialFileInputModule
]
})

export class AngularMaterialModule
{

}
