export interface Site {
  id: string;
  name: string;
  modernName?: string;
  coordinates: [number, number];
  events: {
    title: string;
    description: string;
    scripture: string;
    scriptureText?: string;
  }[];
}

export interface Journey {
  id: string;
  name: string;
  color: string;
  sites: Site[];
}
