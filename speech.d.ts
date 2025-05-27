interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  onresult: ((this: SpeechRecognition, ev: any) => any) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
