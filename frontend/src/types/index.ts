export interface Event {
  title: string;
  category: string;
  content: string;
  date: string;
  sentiment_score: number;
  sentiment_label: string;
  entities: { text: string; label: string }[];
  summary: string;
  location: { lat: number; lng: number };
  urgency?: number;
}
