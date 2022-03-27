// contracts/NFTMarket.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event TestEvent(uint256 testID);

    constructor() ERC721("DKM's NFTs", "DKMNFT") { }

    // on client - upload token metadata and get the created token URI  
    function createNFT(string calldata tokenURI) public returns (uint256) {
        // mint nft and set the token URI to the passed one
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        emit TestEvent(newItemId);  
        return newItemId;
    }
}