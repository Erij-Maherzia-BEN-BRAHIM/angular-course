import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { expand } from './../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations:[
    expand()
  ]
})
export class AboutComponent implements OnInit {

  constructor(private leaderService:LeaderService) { }
leaders: Leader[]
  ngOnInit(): void {
   this.leaderService.getLeaders().subscribe(leaders=>this.leaders=leaders)
  }

}
