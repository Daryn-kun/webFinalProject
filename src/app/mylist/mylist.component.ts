import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestapiService} from '../service/restapi.service';
import {Movies} from '../model/movies';
import {SafeUrl} from '@angular/platform-browser';
import {TrailerService} from '../service/trailer/trailer.service';
import {Subscription} from 'rxjs';
import {Movie} from '../model/movie';
import {MovieService} from '../service/movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  sliderConfig = {
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  Watchlist: any = [];
  selected: any;
  movieSelected = false;
  selectedTrailer: SafeUrl = '';

  constructor(public restApiService: RestapiService, private trailer: TrailerService, public movieService: MovieService, private router: Router) {
  }

  name: string;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.restApiService.getWatchList()
      .subscribe(data => this.Watchlist = data);
  }

  async showMovie(title: string, overview: string, id: number, release_date: string, vote_average: number) {
    this.movieSelected = !this.movieSelected;
    const trailer = await this.trailer.find(title);
    if (!trailer) {
      return;
    }
    this.selected = {title, overview, id, release_date, vote_average};
    this.selectedTrailer = trailer;
    console.log(trailer);
    console.log(this.selected);
  }

  // tslint:disable-next-line:typedef
  deleteFromList(id) {
    if (window.confirm('Are your sure you want to delete?')) {
      this.restApiService.deleteMovie(id)
        .subscribe(data => this.Watchlist);
    }
    this.router.navigate(['/home']);
  }
}
