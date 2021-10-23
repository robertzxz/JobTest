import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

  navToggle() {
    let navUl: HTMLUListElement = document.querySelector('.nav-links') as HTMLUListElement;
    let navLi: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link') as NodeListOf<HTMLElement>;
    let burger: HTMLDivElement = document.querySelector('.burger') as HTMLDivElement;

    navUl.classList.toggle('nav-active')
    burger.classList.toggle('burgerActive');
    navLi.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      }
      else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index  / 5 + 0.5}s`
      }
    })
  }

  closeNav(){
    let burger: HTMLDivElement = document.querySelector('.burger') as HTMLDivElement;
    let navUl: HTMLUListElement = document.querySelector('.nav-links') as HTMLUListElement;
    let navLi: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-link') as NodeListOf<HTMLElement>;
    burger.classList.remove('burgerActive')
    navUl.classList.remove('nav-active')
    navLi.forEach((link) => {
      link.style.animation = '';
    })
  }
}
