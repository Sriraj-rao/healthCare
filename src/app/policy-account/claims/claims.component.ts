import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cwb-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.' + environment.cwbTheme + '.scss'],
})
export class ClaimsComponent implements OnInit {
  ngOnInit() {}
}
