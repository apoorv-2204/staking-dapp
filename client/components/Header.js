import React from 'react';
// web3 button to connect to wallet and display account address
import { ConnectButton } from 'web3uikit';

function Header() {
  return (
    <nav className="p-5 border-b-2">
      <div className='md:flex flex-row'>
        <div>
          <h1 className="py-4 px-4 font-bold text-3xl">Staking App</h1>
        </div>
        <div className="ml-auto py-2 px-4">
          {/* { if true & server is connected & web3 is enabled will automatically try to connect user to the server} */}
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
    </nav>
  );
}

export default Header;