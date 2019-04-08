export class Task {
    constructor(
      public name: string,
      public isDone: boolean,
      public isEditable: boolean,
      public creationDate: Date,
      public id?: number) {}
  }
