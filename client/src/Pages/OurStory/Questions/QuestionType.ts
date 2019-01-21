export interface Question {
  onChange: (index: number) => void;
  value?: number;
  correctAnswer: number;
  disabled?: boolean;
}
