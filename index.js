require('dotenv').config();
const Resolution = require('@unstoppabledomains/resolution').default;
const publicIPFSgateway = 'https://cloudflare-ipfs.com/ipfs';

const resolution = new Resolution({
  blockchain: {
    ens: {url: process.env.INFURA_URI},
    cns: {url: process.env.INFURA_URI}
  }
});

const getAddress = async (domain, currency = 'ETH') => {
  try {
    const address = await resolution.address(domain, currency);
    console.log(`${domain} resolves to ${address}`);
    return address;
  }
  catch(ex) {
    throw ex;
  }
};

const getUrl = async domain => {
  try {
    const hash = resolution.ipfsHash(domain);
    const url = `${publicIPFSgateway}/${hash}`;
    console.log(`${domain} redirects to ${url}`);
    return url;
  }
  catch(ex) {
    throw ex;
  }
};

((async () => {
  try {
    let address2 = getAddress('creepto.crypto', 'ETH');
    let url = getUrl('youdoyou.crypto');
    let address1 = await getAddress('guy.wantsome.eth', 'ETH');
  }
  catch(ex) {
    console.error(ex);
  }
})());
