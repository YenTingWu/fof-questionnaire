import type { NextPage } from 'next';
import { getForm } from '@lib/firebase';
import type { Form } from '@types';

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
  console.log(form);
  return <div>This is Form</div>;
};

export const getServerSideProps = async (ctx: ServerSideCtx) => {
  const form = await getForm(ctx.params.fid);

  return {
    props: {
      form,
    },
  };
};
export default Form;
