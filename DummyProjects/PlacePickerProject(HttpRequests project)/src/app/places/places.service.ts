import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {catchError, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Failed to fetch places');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Failed to fetch user places').pipe(tap({
      next: (userPlaces) => {
        this.userPlaces.set(userPlaces.places);
      }
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update(prevPlaces => [...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(
      catchError((error) => {
      this.userPlaces.set(prevPlaces);
      this.errorService.showError('Failed to add place to user places');
      return throwError(() => new Error('Failed to add place to user places'));
    }));
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id).pipe(
      catchError((error) => {
      this.userPlaces.set(prevPlaces);
      this.errorService.showError('Failed to remove place from user places');
      return throwError(() => new Error('Failed to remove place from user places'));
    })
    );

  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(catchError((error) => {
        return throwError(() => new Error(errorMessage));
      }))
  }
}
