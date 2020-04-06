export interface Fields {
  Datetime: string;
  Infected: number;
  Remedied: number;
}

export interface Record {
  id: string;
  fields: Fields;
  createdTime: Date;
}

export interface Result {
  records: Record[];
}
