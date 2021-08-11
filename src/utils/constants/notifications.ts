/* eslint-disable no-unused-vars */
import { flatten } from 'lodash';

export enum NotificationType {
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
}

export type NotificationContent =
  | string
  | string[]
  | Record<string, string>
  | Record<string, string[]>
  | undefined;

export class Notification {
  public id!: number;
  public message: string[];

  constructor(
    public type: NotificationType,
    message: NotificationContent,
    public sticky?: boolean,
  ) {
    if (!message) {
      this.message = [];
      return;
    }

    if (typeof message === 'string') {
      this.message = [message];
      return;
    }

    if (Array.isArray(message)) {
      this.message = message;
      return;
    }

    this.message = flatten(Object.values(message)).map((message) => {
      return message;
    });
  }
}
