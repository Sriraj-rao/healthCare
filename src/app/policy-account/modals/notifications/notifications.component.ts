import { Component, OnInit, Inject } from '@angular/core';
import { NotificationDisplay } from '../../models/notifications-display..model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cwb-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  index = 0;
  notificationToDisplay: NotificationDisplay = this.notificationsData.notifications[this.index];

  constructor(public dialogRef: MatDialogRef<NotificationsComponent>, @Inject(MAT_DIALOG_DATA)
  public notificationsData: {notifications: NotificationDisplay[]}, ) { }

  ngOnInit(): void {
  }

  onAcknowledge(){
    if (this.index < this.notificationsData.notifications.length){
      this.index = this.index + 1;
      this.notificationToDisplay = this.notificationsData.notifications[this.index];
    }
    else{
      this.dialogRef.close();
    }
  }

}
