//const { assert } = require("console");

const starNotary = artifacts.require("starNotary")
let accounts;
let owner;

contract('starNotary', async (accs)=>{
    accounts = accs;
    owner = accounts[0];
   
})

it ('has correct name', async()=>{
    let instance = await starNotary.deployed();
    let starName = await instance.starName.call();
    assert.equal( starName, "This is a star");
})

it('can be claimed', async()=>{
    let instance = await starNotary.deployed();
    await instance.claimStar({from: owner}); // calling the smart contract function claim star
    let starOwner = await instance.starOwner.call(); //get the owner address
    assert.equal(starOwner, owner)
})
it('can change names', async () => {
    let instance = await starNotary.deployed();
    await instance.claimStar({from: owner});
    await instance.renameStar('NnamdiStar', {from: owner});
    assert.equal(await instance.starName.call(), 'NnamdiStar');
   })
   it('can change owners', async () => {
    let instance = await starNotary.deployed();
    let secondUser = accounts[1];
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({from: secondUser});
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secondUser);
 });