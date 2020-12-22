import {Component, Input, OnInit} from '@angular/core';
import {Movies, ResultsEntity} from '../model/movies';
import {TrailerService} from '../service/trailer/trailer.service';
import {SafeUrl} from '@angular/platform-browser';
import {RestapiService} from '../service/restapi.service';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(private trailer: TrailerService, public restApi: RestapiService) {
  }

  @Input() sliderConfig;
  @Input() movies: Movies;
  @Input() title: string;
  selected: any;
  movieSelected = false;
  selectedTrailer: SafeUrl = '';
  SavedMovies: any = [];

  // tslint:disable-next-line:typedef variable-name max-line-length
  @Input() movieDetails: { firstName: string; moviePoster: string; movieTitle: string; movieOverview: string; movieRelease: string; movieRate: number };

  ngOnInit(): void {
    this.restApi.getWatchList()
      .subscribe(data => this.SavedMovies = data);
  }

  async showMovie(title: string, overview: string, id: number, release_date: string, vote_average: number, poster: string) {
    this.movieSelected = !this.movieSelected;
    const trailer = await this.trailer.find(title);
    if (!trailer) {
      return;
    }
    this.selected = {title, overview, id, release_date, vote_average, poster};
    this.selectedTrailer = trailer;
    console.log(trailer);
    console.log(this.selected);
  }

  // tslint:disable-next-line:variable-name
  addToList(movieTitle: string, movieOverview: string, movieRelease: string, movieRate: number, moviePoster: string) {
    if (this.checkMovie(moviePoster)) {
      // @ts-ignore
      const firstName = 'Daryn';
      this.movieDetails = {firstName, moviePoster, movieTitle, movieOverview, movieRelease, movieRate};
      this.restApi.addToList(this.movieDetails)
        .subscribe((data: {}) => {
          this.movieSelected = !this.movieSelected;
        });
    }
  }

  checkMovie(poster): boolean {
    if (this.SavedMovies.find(x => x.moviePoster === poster)) {
      return false;
    } else {
      return true;
    }

  }
}
