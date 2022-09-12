import { Input } from '../../components/input/Input';
import type { NextPageWithLayout } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type Props = {
  users?: User[];
};
const About: NextPageWithLayout = (props: Props) => {
  const [users,setUsers] = useState<User[] | undefined>(props.users)
  const router = useRouter();
    const [search,setSearch] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ defaultValues: {name: '', email: ''} });
  
  const onSubmit = async (data: User) => {
    const requestBody = {
      email: data.email,
      name: data.name,
    };
    const response = await axios.post(`http://localhost:3000/api/user`, requestBody);
    const responseData:User = response.data
    router.push(`http://localhost:3000/user/${responseData.id}`)
  };

  useEffect(()=>{
    (async()=>{
        const newUsers = await axios.get(`http://localhost:3000/api/user`,
        {
            params:{
                name:search ? search: undefined
            }
        });
        const newUsersData = newUsers.data
        setUsers(newUsersData)
    })()
    
  },[search])

  return (
    <>
        <hr/>
        <input defaultValue={''} {...register('name')} />
        <hr />
        <input defaultValue={''} {...register('email')} />
        <hr />
        <input type="submit" onClick={handleSubmit(onSubmit)}/>
        <hr />


        <p>検索</p>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} />
      {users?.map((user) => {
        return (
          <>
            <hr />
                <Link
                href={{
                    pathname: `/user/${user.id}`, //URL
                    query: { user_id: user.id },
                }}
                >
                <a>{user.id}</a>
                </Link>
                <p>{user.name}</p>
                <p>{user.email}</p>
            <hr />
          </>
        );
      })}
    </>
  );
};

// サーバサイドで実行する処理(getServerSideProps)を定義する
export const getServerSideProps: GetServerSideProps = async (context) => {
  // APIやDBからのデータ取得処理などを記載
  const response = await axios.get('http://localhost:3000/api/user');
  const responseData = response.data;
  const props: Props = {
    users: responseData,
  };

  return {
    props: props,
  };
};

About.getLayout = (page) => <>{page}</>;

export default About;
