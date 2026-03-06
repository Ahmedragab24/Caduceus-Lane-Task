export interface SliderData {
  id: number;
  name: string;
}

export interface ParamsType {
  page?: number;
  per_page?: number;
  name?: string;
}

export interface ResponseSliders {
  data: SliderData[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface MediaOfSlideData {
  id: number;
  name: string;
}

export interface ResponseMediaOfSlides {
  data: MediaOfSlideData[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
