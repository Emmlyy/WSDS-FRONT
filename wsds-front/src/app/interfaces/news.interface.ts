export interface INews {
  date: string;
  sheet_id: string;
  source: string;
  tag: string;
  title: string;
  text: string;
  url: string;
}

export interface INewUrl {
  url: string;
}

export interface ISavedNews {
  date: string;
  sheet_id: string;
  source: string;
  tag: string;
  title: string;
  text: string;
  url: string;
  sheet:  ISheet | null
}

export interface ISheet {
  indicators: { indicator_name: string, response: string } []
  priority: number
  id: string
}
