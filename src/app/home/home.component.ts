import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Article } from '../models/ApiDataModel';
import { ApiHttpService } from '../services/api-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public articleList = [] as Article[];
  public searchInput!: string;
  public totalNumArticles!: number;

  private apiParams: any = {
      offset: 0,
      sort: 'published_desc',
  }

  constructor(
    private service: ApiHttpService,
  ) { }

  ngOnInit(): void {
    this.getLatest();
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.apiParams.offset += 25;
      this.getLatest();
    }
  }


  getLatest() {
    let currentParams = new HttpParams ({
      fromObject: this.apiParams
    })
    this.service.getNews(currentParams).subscribe((response)=>{
      for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        element.published_at = new Intl.DateTimeFormat('en-US').format(new Date(element.published_at))
        this.articleList.push(element)
      }
    })
  }

  openLink(url: string) {
    window.open(url, '_blank',"windowFeatures=''")
  }

  sortArticles(direction: string) {
    this.apiParams.offset = 0;
    this.apiParams.sort = direction;
    this.articleList = [];
    this.getLatest();
  }

  changeLan(language: string) {
    if (language == 'all') {
      delete this.apiParams['language'];
    }
    else {
      this.apiParams.language = language;
    }
    this.apiParams.offset = 0;
    this.articleList = [];
    this.getLatest();
  }

  readMoreToggle(i:number) {
    let paragraph: HTMLParagraphElement = document.querySelector('p#desc'+ i) as HTMLParagraphElement;
    let readMoreButton: HTMLParagraphElement = document.querySelector('p#readMore'+ i) as HTMLParagraphElement;
    paragraph.classList.toggle('paraActive');
    if (paragraph.classList.contains('paraActive')) {
      readMoreButton.innerText = 'Read Less...'
    }
    else {
      readMoreButton.innerText = 'Read More...'
    }
  }

  checkForReadMore(i:number){
    let paragraph: HTMLParagraphElement = document.querySelector('p#desc'+ i) as HTMLParagraphElement;
    if (paragraph.innerText.length > 30) {
      return true
    }
    else {
      return false
    }
  }

}
