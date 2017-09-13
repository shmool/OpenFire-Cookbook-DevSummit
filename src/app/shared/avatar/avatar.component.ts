import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { User } from '../user.interface';

@Component({
  selector: 'app-avatar',
  template: `
    <div *ngIf="photoUrl; else smiley"
         class="avatar"
         [ngStyle]="{'background-image': getAvatarImage()}"></div>

    <ng-template #smiley>
      <md-icon class="avatar"
               [ngStyle]="{color: avatarColor}">face
      </md-icon>
    </ng-template>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() photoUrl;
  @Input() avatarColor;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.user && this.user) {
      this.photoUrl = this.user.photoURL;
      this.avatarColor = this.user.avatarColor;
    }
  }

  getAvatarImage() {
    return `url(${this.photoUrl})`;
  }

}
