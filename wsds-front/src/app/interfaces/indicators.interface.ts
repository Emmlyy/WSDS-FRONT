export interface IPrompts {
  indicator_name: string,
  prompt: string,
  id: string,
}

export interface IIndicator {
  indicator_name: string;
  prompt: string;
  id: string;
}
export interface IIndicatorEntry {
  indicators: IIndicator[],
  name: string;
  id: string;
}
