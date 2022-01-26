export type OptionsType = 'single' | 'multiple' | 'essay' | 'short_answer';

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
  uid?: string;
  title: string;
  description: string;
  expired_date: number;
  init_id: string;
  questions: Record<string, Question>;
};

// type MultipleData = {
//   uid: string;
//   type: 'multiple';
//   data: string[];
// };

// type SingleData = {
//   uid: string;
//   type: 'single';
//   data: string;
// };

// type EssayData = {
//   uid: string;
//   type: 'essay';
//   data: string;
// };

// type ShortAnswerData = {
//   uid: string;
//   type: 'short_answer';
//   data: string;
// };

export type QuestionnaireData = { uid: string; data: string | string[] };
