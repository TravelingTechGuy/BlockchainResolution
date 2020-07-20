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
    return address;
  }
  catch(ex) {
    throw ex;
  }
};

const getUrl = async domain => {
  try {
    const hash = await resolution.ipfsHash(domain);
    const url = `${publicIPFSgateway}/${hash}`;
    return url;
  }
  catch(ex) {
    throw ex;
  }
};

((async () => {
  try {
    const ethDomains = ['creepto.crypto', 'guy.wantsome.eth'];
    const domain ='youdoyou.crypto';

    //get ETH addresses
    const addresses = await Promise.all(ethDomains.map(address => getAddress(address, 'ETH')));
    addresses.forEach((address, i) => console.log(`${ethDomains[i]} resolves to ${address}`));

    //get IPFS url from domain
    const url = await getUrl(domain);
    console.log(`${domain} redirects to ${url}`);
  }
  catch(ex) {
    console.error(ex);
  }
})());
