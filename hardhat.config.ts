import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      chainId: 1337,
      // gas: 2100000,
      // gasPrice: 9000000000,
      // allowUnlimitedContractSize: true,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${'o5IHGB5-jXxR18g78HUulEHEAA2jOeLx'}`,
      accounts: ['aa8b3c85bdde5cb361563c0a831b69f56e3910514875cce47193519e202d4536'],
    },
  },
};

export default config;
