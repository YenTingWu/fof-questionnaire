import type { Form, Question } from '@types';
import type { NextPage } from 'next';
import { useState } from 'react';
import { VStack, Heading, Text, Stack } from '@chakra-ui/layout';
import { getForm } from '@lib/firebase';
import { FormLayout } from '@components/FormLayout';
import { Single, Multiple, Essay, ShortAnswer } from '@components/Block';

type Params = {
  fid: string;
};

type Props = {
  form: Form;
};

type ServerSideCtx = {
  params: Params;
};

const Form: NextPage<Props> = ({ form }) => {
  const { title, description, questions, init_id } = form;
  const parsedQuestions = parseQuestionsToArray(questions, init_id);
  const answer = parseQuestionToFormatAnswer(parsedQuestions);

  const [currentQuestions, setCurrentQuestions] =
    useState<Question[]>(parsedQuestions);

  // const [currentAnswers, setCurrentAnswers] = useState(answer);

  const blocks = currentQuestions.map((q, index) => {
    switch (q.type) {
      case 'single':
        return <Single key={q.title} title={q.title} options={q.options} />;
      case 'multiple':
        return <Multiple key={q.title} title={q.title} options={q.options} />;
      case 'essay':
        return <Essay key={q.title} title={q.title} />;
      case 'short_answer':
        return <ShortAnswer key={q.title} title={q.title} />;
      default:
        throw new Error('HI');
    }
  });

  return (
    <FormLayout>
      <VStack w="full" spacing="5" alignItems="flex-start">
        <Stack w="full" spacing="5" p="5" bg="white">
          <Heading size="xl">{title}</Heading>
          <Text>{description}</Text>
        </Stack>
        {blocks}
        <Essay title="Essay" />
        <ShortAnswer title={'short answer'} />;
      </VStack>
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
  let question = questions[initId];
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

const parseQuestionToFormatAnswer = (questionsArray: Question[]) => {
  return questionsArray.map((q) => {
    switch (q.type) {
      case 'single':
        return { uid: q.uid!, a: [] };
      case 'multiple':
        return { uid: q.uid!, a: [] };
      case 'essay':
        return { uid: q.uid!, a: '' };
      case 'short_answer':
        return { uid: q.uid!, a: '' };
      default:
        throw new Error('HI');
    }
  });
};

export default Form;
