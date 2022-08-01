import { Component, Inject, OnInit } from '@angular/core';
import { flyInOut , expand} from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader:Leader;
  dishErrMess:string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    
    @Inject('BaseURL') public BaseURL
    ) { }

  ngOnInit(): void {
     this.dishservice.getFeaturedDish().subscribe(dishes=>this.dish = dishes,dishErrMess=> this.dishErrMess=<any>dishErrMess );
     this.promotionservice.getFeaturedPromotion().subscribe(promotions=>this.promotion =promotions);
    this.leaderService.getFeaturedLeader().subscribe(leaders=>this.leader=leaders)
  }

}
