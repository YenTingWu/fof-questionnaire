import type { Form, Question } from '@types';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';
import { chakra } from '@chakra-ui/system';
import { VStack, Heading, Text, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { getForm, createSurveyData } from '@lib/firebase';
import { FormLayout } from '@components/FormLayout';
import {
  Single,
  Multiple,
  Essay,
  ShortAnswer,
  Wrapper as BlockWrapper,
} from '@components/Block';

type Params = {
  fid: string;
};

type Props = {
  form: Form;
};

type ServerSideCtx = {
  params: Params;
};

const INVALID_TYPE_ERROR_MESSAGE = 'Error: Invalid type';

const Form: NextPage<Props> = ({ form }) => {
  const { title, description, questions: questionMap, init_id, uid } = form;
  const sortedQuestions = useMemo(
    () => parseQuestionsToArray(questionMap, init_id),
    [init_id, questionMap]
  );

  const sortedAnswer = useMemo(
    () => parseQuestionToFormatAnswer(sortedQuestions),
    [sortedQuestions]
  );

  const [questions, setQuestions] = useState<Question[]>(sortedQuestions);
  const [answers, setAnswers] = useState<(string | string[])[]>(sortedAnswer);

  const { push } = useRouter();

  const handleAnswerChange = useCallback(
    (index: number) => (v: string | string[]) => {
      setAnswers((prev) => {
        prev.splice(index, 1, v);
        return [...prev];
      });
    },
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!uid) return;

    const surveyData = answers.map((item, index) => {
      const q = questions[index];
      return { uid: q.uid!, data: item };
    });

    try {
      await createSurveyData(surveyData, uid);
      push('/f/greeting');
    } catch (err) {
      console.log(err);
    }
  };

  const blocks = useMemo(
    () =>
      questions.map((q, index) => {
        switch (q.type) {
          case 'single':
            return (
              <Single
                key={`${q.title}_${q.uid}`}
                title={q.title}
                options={q.options}
                value={answers[index] as string}
                onChange={handleAnswerChange(index)}
              />
            );
          case 'multiple':
            return (
              <Multiple
                key={`${q.title}_${q.uid}`}
                title={q.title}
                options={q.options}
                value={answers[index] as string[]}
                onChange={handleAnswerChange(index)}
              />
            );
          case 'essay':
            return (
              <Essay
                key={`${q.title}_${q.uid}`}
                title={q.title}
                value={answers[index] as string}
                onChange={handleAnswerChange(index)}
              />
            );
          case 'short_answer':
            return (
              <ShortAnswer
                key={`${q.title}_${q.uid}`}
                title={q.title}
                value={answers[index] as string}
                onChange={handleAnswerChange(index)}
              />
            );
          default:
            throw new Error(INVALID_TYPE_ERROR_MESSAGE);
        }
      }),
    [questions, answers, handleAnswerChange]
  );

  return (
    <FormLayout>
      <chakra.form onSubmit={handleSubmit}>
        <VStack w="full" spacing="5" alignItems="flex-start">
          <Stack w="full" spacing="5" p="5" bg="white">
            <Heading size="xl">{title}</Heading>
            <Text>{description}</Text>
          </Stack>
          {blocks}
        </VStack>
        <BlockWrapper pt="10">
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </BlockWrapper>
      </chakra.form>
    </FormLayout>
  );
};

export const getServerSideProps = async (ctx: ServerSideCtx) => {
  const form = await getForm(ctx.params.fid);

  if (form == null) {
    return {
      redirect: {
        notFound: true,
      },
    };
  }

  form.uid = ctx.params.fid;

  return {
    props: {
      form,
    },
  };
};

const parseQuestionsToArray = (
  questions: Record<string, Question>,
  initId: string
) => {
  let question = { ...questions[initId] };
  question.uid = initId;
  let newQuestionArray = [question];

  while (typeof question.to === 'string') {
    const questionUid = question.to;
    question = questions[questionUid];
    question.uid = questionUid;
    newQuestionArray.push(question);
  }

  return newQuestionArray;
};

const parseQuestionToFormatAnswer = (
  questionsArray: Question[]
): (string | string[])[] => {
  return questionsArray.map((q) => {
    switch (q.type) {
      case 'single':
        return '';
      case 'multiple':
        return [];
      case 'essay':
        return '';
      case 'short_answer':
        return '';
      default:
        throw new Error(INVALID_TYPE_ERROR_MESSAGE);
    }
  });
};

export default Form;
