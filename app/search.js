import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);
let id = 0;

export default async function search(address) {
  const searchContract = new ethers.Contract(address, Escrow.abi, provider);
  let arbiter = null;
  let beneficiary = null;
  let depositor = null;
  let value = null;
  try {
    const signer = provider.getSigner();
    results = await searchContract.connect(signer).viewData();
    arbiter = results[0];
    beneficiary = results[1];
    depositor = results[2];
    value = await provider.getBalance(address);
  } catch(err) {
    document.getElementById("search").innerText = "Error, contract not found or you are not permitted to view the contract"
    return;
  }

  value = ethers.utils.formatEther(value.toString());
  let buttonId = `approve-${id++}`
  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, depositor, value);

  searchContract.on('Approved', () => {
    document.getElementById(buttonId).className = "complete";
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener("click", async () => {
    const signer = provider.getSigner();
    try {
      await searchContract.connect(signer).approve();
    } catch(err) {
      document.getElementById(buttonId).innerText = "Error occurred, invalid signer";
    }
  });
}

function createHTML(buttonId, arbiter, beneficiary, depositor, value) {
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
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
