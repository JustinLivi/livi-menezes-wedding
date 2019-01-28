export interface Question {
  onChange: (index: number) => void;
  value: number | null;
  correctAnswer: number;
  disabled?: boolean;
}
