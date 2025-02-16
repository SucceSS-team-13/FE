interface Chat {
  id: number;
  sender?: "user" | "lumi";
  text: string;
  location?: string;
}