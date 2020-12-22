import { Injectable } from '@angular/core';
import * as movieTrailer from 'movie-trailer';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
//const movieTrailer = require('movie-trailer');
@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  constructor(private sanitizer: DomSanitizer) { }
  async find(title: string): Promise<SafeUrl>{
    if (!title) return null;
    const trailer = await movieTrailer(title).catch(err => err);
    const url = 'https://www.youtube.com/embed/' + trailer.split('=').reverse()[0] + '?autoplay=1';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
