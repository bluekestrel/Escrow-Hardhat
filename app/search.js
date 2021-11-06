import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function search(address) {
  const searchContract = new ethers.Contract(address, Escrow.abi, provider);
  const arbiter = await searchContract.arbiter();
  const beneficiary = await searchContract.beneficiary();
  const depositor = await searchContract.depositor();
  let value = await provider.getBalance(address);
  value = ethers.utils.formatEther(value.toString());
  container.innerHTML += createHTML(arbiter, beneficiary, depositor, value);
}

function createHTML(arbiter, beneficiary, depositor, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Depositor </div>
          <div> ${depositor} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} ETH </div>
        </li>
      </ul>
    </div>
  `;
}
