type OptionsType = 'single' | 'multiple' | 'essay' | 'short_answer';

type Multiple = {
  uid?: string;
  title: string;
  options: string[];
  to?: Record<string, string>;
  type: 'multiple';
};

type Single = {
  uid?: string;
  title: string;
  options: string[];
  to?: Record<string, string>;
  type: 'single';
};

type Essay = {
  uid?: string;
  title: string;
  to?: Record<string, string>;
  type: 'essay';
};

type ShortAnswer = {
  uid?: string;
  title: string;
  to?: Record<string, string>;
  type: 'short_answer';
};

type Question = Single | Multiple | Essay | ShortAnswer;

export type Form = {
  title: string;
  description: string;
  expired_date: number;
  init_id: string;
  questions: Record<string, Question>;
};
