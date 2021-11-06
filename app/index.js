import {ethers} from 'ethers';
import deploy from './deploy';
import search from './search';
import addContract from './addContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = ethers.BigNumber.from(document.getElementById("wei").value);
  const contract = await deploy(arbiter, beneficiary, value);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

async function searchForContract() {
  const contractAddress = document.getElementById("contractAddress").value;
  await search(contractAddress);
}

document.getElementById("deploy").addEventListener("click", newContract);
document.getElementById("search").addEventListener("click", searchForContract);
