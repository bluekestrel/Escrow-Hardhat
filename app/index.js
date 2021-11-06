import {ethers} from 'ethers';
import deploy from './deploy';
import search from './search';
import addContract from './addContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = document.getElementById("eth").value;
  const valueETH = ethers.utils.parseUnits(value, "ether");
  const valueWEI = ethers.utils.parseUnits(valueETH.toString(), "wei");
  const contract = await deploy(arbiter, beneficiary, valueWEI);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

async function searchForContract() {
  const contractAddress = document.getElementById("contractAddress").value;
  await search(contractAddress);
}

document.getElementById("deploy").addEventListener("click", newContract);
// note: if you click on search too soon, you'll get an unhelpful metamask error about
//       'gas estimations' which just means the contract hasn't been fully deployed yet
//       so you just need to wait a minute or so
document.getElementById("search").addEventListener("click", searchForContract);
