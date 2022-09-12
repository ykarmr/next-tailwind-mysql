import type { NextPageWithLayout } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type Props = {
  user?: User;
};
const About: NextPageWithLayout = (props: Props) => {
  const { user } = props;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });

  const onSubmit = async (data: User) => {
    const requestBody = {
      email: data.email,
      name: data.name,
    };
    await axios.put(`http://localhost:3000/api/user/${user?.id}`, requestBody);

    router.push("http://localhost:3000/user")
  };

  const back = () => {
    router.push("http://localhost:3000/user")
  };

  const deleteUser = async() => {
    await axios.delete(`http://localhost:3000/api/user/${user?.id}`)
    router.push("http://localhost:3000/user")
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={user?.name ?? ''} {...register('name')} />
        <hr />
        <input defaultValue={user?.email ?? ''} {...register('email')} />
        <hr />
        <input type="submit"/>
        <hr />
        <button type='button' onClick={back}>back</button>
        <hr/>
        <button type='button' onClick={deleteUser}>delete</button>
      </form>

    </>
  );
};

// サーバサイドで実行する処理(getServerSideProps)を定義する
export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_id = context.query.user_id;
  // APIやDBからのデータ取得処理などを記載
  const response = await axios.get(`http://localhost:3000/api/user/${user_id}`);
  const responseData = response.data;
  const props: Props = {
    user: responseData,
  };

  return {
    props: props,
  };
};

About.getLayout = (page) => <>{page}</>;

export default About;
