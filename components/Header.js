import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
export default () => {
  return(
    // Need to add two curly braces when we are referring to
    // object literals, one { } for writing Javascript code
    // and other {} for writing object literal.
    // Adding object literal hear to give some margin above the
    // header.
    <Menu style = {{ marginTop: '10px' }}>
      <Link route='/'>
          <a className='item'>
            CrowdCoin
          </a>
      </Link>
      <Menu.Menu position='right'>
      <Link route='/'>
          <a className='item'>
            Campaigns
          </a>
      </Link>
      <Link route='/campaigns/new'>
          <a className='item'>
            +
          </a>
      </Link>
      </Menu.Menu>
    </Menu>
  );

};
