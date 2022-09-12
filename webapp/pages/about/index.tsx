import { Input } from '../../components/input/Input';
import type { NextPageWithLayout } from 'next';

const About: NextPageWithLayout = () => {
  return (
    <>
      about
      <Input />
    </>
  );
};

About.getLayout = (page) => (
  <>
    test
    {page}
    test
  </>
);

export default About;
