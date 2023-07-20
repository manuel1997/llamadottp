import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageUrlSubject = new BehaviorSubject<string>('');

  public imageUrl$ = this.imageUrlSubject.asObservable();

  public setImageUrl(url: string): void {
    this.imageUrlSubject.next(url);
  }
}