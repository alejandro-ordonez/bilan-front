export interface Response {
  description: string;
  result?: any;
  code: number;
}

export interface ResponseDto<T>{
  description: string;
  result?: T;
  code: number;
}
