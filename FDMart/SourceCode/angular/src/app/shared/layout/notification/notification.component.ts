import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  ngOnInit(): void {
  }
  @ViewChild("template", { read: TemplateRef })
  public notificationTemplate: TemplateRef<any>;

  public warningSteps = [
    "Stock up on flashlights, spare batteries, food and water.",
    "Check your first aid kit.",
    "Test your generator or battery backup.",
  ];

  constructor(private notificationService: NotificationService) { }

  public show(): void {
    this.notificationService.show({
      content: this.notificationTemplate,
      position: { horizontal: "right", vertical: "top" },
      animation: { type: "fade", duration: 500 },
      closable: true,
      type: { style: "warning", icon: true },
    });
  }

}
