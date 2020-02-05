import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MakeEditComponent } from '../vehicle-make/make-edit/make-edit.component';


@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MakeEditComponent> {
    canDeactivate(component: MakeEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}