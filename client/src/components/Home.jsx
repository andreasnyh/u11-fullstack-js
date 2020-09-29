import React from 'react';

import { Button } from './elements';

const Home = (props) => {
  return (
    <>
      <p>Home</p>
      <Button
        type="button"
        onClick={() => {
          props.history.push('/');
        }}
      >
        Back
      </Button>
    </>
  );
};

export default Home;
