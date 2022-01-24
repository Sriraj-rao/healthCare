import { Component, OnInit } from '@angular/core';
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import { DetailsSharingService } from 'src/app/core/services/details-sharing.service';

@Component({
  selector: 'cwb-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  constructor(public detailsSharing: DetailsSharingService) {
  }

  ngOnInit(): void {
  }

}
