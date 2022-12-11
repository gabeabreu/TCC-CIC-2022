import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import tokenABI from '../src/utils/contractInterfaces/tokenABI';

describe('MidasFactory', function () {
  describe('Deploys', function () {
    it('Test', async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();

      const MidasFactory = await ethers.getContractFactory('MidasFactory');
      // const Token = await ethers.getContractFactory('MidasToken');

      const factory = await MidasFactory.deploy();
      // const token = await Token.deploy(owner.address, 'MyCollection', 10);
      let events;
      let tx;

      tx = await factory.newCollection(
        owner.address,
        'MyCollection',
        10,
        'https://ipfs.io/ipfs/QmTRwtJvoP44qghiiwBQtqQzSHNG8xWmd7yW7qBfPNYbEd',
        'commonLink',
        'rareLink',
        'superRareLink',
        'epicLink',
        'legendLink'
      );

      const { events: firstEvents } = await tx.wait();
      console.log('\nAddresses:');
      console.log('Deployer address:', owner.address);
      console.log('Account 2 address:', addr2.address);
      console.log('Factory address:', factory.address);

      // const ownerAddress = await factory.collections(String(firstEvents?.[0].address));
      // expect(ownerAddress).to.equal(owner.address);
      // const { events: seccondEvents } = await tx.wait();

      const signer = await ethers.getSigner(owner.address);
      const Token = new ethers.Contract(String(firstEvents?.[0].address), tokenABI, signer);

      tx = await Token.owner();
      console.log('\nCollection address:', firstEvents?.[0].address);
      console.log('Owner of Collection:', tx);
      tx = await Token.ownerOf(1);
      console.log('\nOwner of NFT item 1 before transfer:', tx);
      tx = await Token.transferFrom(owner.address, addr2.address, 1);
      tx = await Token.ownerOf(1);
      console.log('Owner of NFT item 1 after transfer:', tx);
      // events = await tx.wait();
    });
  });

  // describe('Deployment', function () {
  //   it('Should set the right unlockTime', async function () {
  //     const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.unlockTime()).to.equal(unlockTime);
  //   });

  //   it('Should set the right owner', async function () {
  //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //     expect(await lock.owner()).to.equal(owner.address);
  //   });

  //   it('Should receive and store the funds to lock', async function () {
  //     const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);

  //     expect(await ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
  //   });

  //   it('Should fail if the unlockTime is not in the future', async function () {
  //     // We don't use the fixture here because we want a different deployment
  //     const latestTime = await time.latest();
  //     const Lock = await ethers.getContractFactory('Lock');
  //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //       'Unlock time should be in the future'
  //     );
  //   });
  // });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
