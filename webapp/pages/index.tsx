import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '../components/button/Button';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/about">
        <Button outlined={false} size={'small'}>
          About Us
        </Button>
      </Link>
    </div>
  );
};

export default Home;
