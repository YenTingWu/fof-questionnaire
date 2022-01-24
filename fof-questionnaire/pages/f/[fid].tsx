import type { Form } from '@types';
import type { NextPage } from 'next';
import { VStack, Heading, Text } from '@chakra-ui/layout';
import { getForm } from '@lib/firebase';
import { FormLayout } from '@components/FormLayout';

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
  const { title, description, questions } = form;

  return (
    <FormLayout>
      <VStack w="full" spacing="3" alignItems="flex-start">
        <Heading size="lg">{title}</Heading>
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

export default Form;
