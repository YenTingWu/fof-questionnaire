type OptionsType = 'single' | 'multiple' | 'essay' | 'short_answer';

type Multiple = {
  title: string;
  options: string[];
  to?: Record<string, string>;
  type: 'multiple';
};

type Single = {
  title: string;
  options: string[];
  to?: Record<string, string>;
  type: 'single';
};

type Essay = {
  title: string;
  to?: Record<string, string>;
  type: 'essay';
};

type ShortAnswer = {
  title: string;
  to?: Record<string, string>;
  type: 'short_answer';
};

type Question = Single | Multiple | Essay | ShortAnswer;

export type Form = {
  title: string;
  description: string;
  questions: Question[];
};
