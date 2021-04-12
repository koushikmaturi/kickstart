import React from 'react';
// Anything added in the Head tag will be moved to the head
// of the HTML file. We are adding the css styling to the Head tag
import Head from 'next/head'
// The container tag will limit the width of the content
// to spread across the whole web page. We used <Container>
// instead of <div> to contain the layout of each page
import {Container} from 'semantic-ui-react';
import Header from './Header';
export default (props) =>  {
  return (
    <Container>
      <Head>
        <link async rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.0/dist/semantic.min.css"
        />
      </Head>
      <Header/>
      {props.children}
    </Container>
  );
};
