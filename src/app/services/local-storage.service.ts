import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public setToLocalStorage(items) {
    localStorage.setItem('eventListItems', JSON.stringify(items));
  }

  public getFromLocalStorage() {
    if (!localStorage.getItem('eventListItems')) {
      return [];
    }
    return JSON.parse(localStorage.getItem('eventListItems'));
  }
}
