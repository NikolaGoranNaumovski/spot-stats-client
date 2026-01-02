export type Song = {
  name: string;
  artist: string;
  genre: string;
};

export enum ClientTimeRange {
  HOURLY = "1hr",
  DAILY = "24hr",
  WEEKLY = "7day",
  MONTHLY = "1month",
  SIX_MONTHS = "6month",
  YEARLY = "12month",
}