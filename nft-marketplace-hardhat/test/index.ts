import { expect } from "chai";
import { ethers } from "hardhat";

// describe("Greeter", function () {
//     it("Should return the new greeting once it's changed", async function () {
//         const Greeter = await ethers.getContractFactory("Greeter");
//         const greeter = await Greeter.deploy("Hello, world!");
//         await greeter.deployed();

//         expect(await greeter.greet()).to.equal("Hello, world!");

//         const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//         // wait until the transaction is mined
//         await setGreetingTx.wait();

//         expect(await greeter.greet()).to.equal("Hola, mundo!");
//     });
// });

describe("NFTMarket", () => {
    let nftMarket: any;
    beforeEach(async () => { 
        const NFTMarket = await ethers.getContractFactory("NFTMarket");
        nftMarket = await NFTMarket.deploy();
        await nftMarket.deployed();
    })

    it("Should newly created NFT uri be the same as the passed one and owner be the same as deployer", async () => {
        const tokenURI = "https://test-token.uri/";
        const transactionResult = await nftMarket.createNFT(tokenURI);
        const receipt = await transactionResult.wait();
        const tokenId = receipt.events[0].args.tokenId;
        const mintedTokenURI = await nftMarket.tokenURI(tokenId);
        expect(mintedTokenURI).to.equal(tokenURI);
        
        const ownerAddress = await nftMarket.ownerOf(tokenId);
        const signersCollection = await ethers.getSigners();
        expect(ownerAddress).to.equal(signersCollection[0].address);
    })
})