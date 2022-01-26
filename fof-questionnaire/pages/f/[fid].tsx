import type { Form, Question, OptionsType } from '@types';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';
import { chakra } from '@chakra-ui/system';
import { VStack, Heading, Text, Stack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { getForm, createSurveyData } from '@lib/firebase';
import { FormLayout } from '@components/FormLayout';
import { Single, Multiple, Essay, ShortAnswer } from '@components/Block';
import getLast from 'lodash/fp/last';
import isArray from 'lodash/fp/isArray';

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
  const {
    title,
    description,
    questions: questionMap,
    init_id,
    uid: formUid,
  } = form;
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

  const handleNextQuestionButtonClick = useCallback(() => {
    const lastQ = getLast(questions);
    const lastA = getLast(answers);

    if (typeof lastQ?.to !== 'object' || typeof lastA !== 'string') return;
    if (lastA === '') return;

    const { to } = lastQ;

    const nextId = to[lastA] || to['base'];

    const nextItem = { ...questionMap[nextId] };
    if (!nextItem) return;

    nextItem.uid = nextId;

    setQuestions((prev) => [...prev, nextItem]);
    setAnswers((prev) => [...prev, getInitValueDependOnType(nextItem.type)]);
  }, [questionMap, questions, answers]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const lastQ = getLast(questions);

    if (!formUid) return;
    if (!checkIsAnswerValid(answers)) return;
    if (lastQ?.to) return;

    const surveyData = answers.map((item, index) => {
      const q = questions[index];
      return { uid: q.uid!, data: item };
    });

    try {
      await createSurveyData(surveyData, formUid);
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
            const isLast = index === questions.length - 1;
            return (
              <Single
                key={`${q.title}_${q.uid}`}
                title={q.title}
                options={q.options}
                value={answers[index] as string}
                onChange={handleAnswerChange(index)}
                isLast={index === questions.length - 1}
                isDisabled={typeof q.to === 'object' && !isLast}
                onNextQuestionButtonClick={
                  typeof q.to === 'object'
                    ? handleNextQuestionButtonClick
                    : undefined
                }
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
    [questions, answers, handleAnswerChange, handleNextQuestionButtonClick]
  );

  return (
    <FormLayout>
      <chakra.form display="flex" flexDir="column" onSubmit={handleSubmit}>
        <VStack w="full" spacing="5" alignItems="flex-start">
          <Stack w="full" spacing="5" p="5" bg="white" borderRadius="xl">
            <Heading size="xl">{title}</Heading>
            <Text>{description}</Text>
          </Stack>
          {blocks}
        </VStack>
        {!getLast(questions)?.to && (
          <Button
            alignSelf="flex-end"
            mt="10"
            marginX="auto"
            // variant="outline"
            colorScheme="gray"
            type="submit"
          >
            寫完了
          </Button>
        )}
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

const getInitValueDependOnType = (type: OptionsType): string | string[] => {
  switch (type) {
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
};

const checkIsAnswerValid = (answers: (string | string[])[]) => {
  return answers.every((a) => {
    if (isArray(a) && a.length >= 1) return true;
    if (typeof a === 'string' && a !== '') return true;
    return false;
  });
};

const parseQuestionToFormatAnswer = (
  questionsArray: Question[]
): (string | string[])[] => {
  return questionsArray.map((q) => getInitValueDependOnType(q.type));
};

export default Form;
