// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './MidasToken.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract MidasFactory is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // (itemId -> (ownerAddress -> collectionId))
    // mapping(uint256 => mapping(uint256 => uint256)) public item;
    // itemId -> claimedStatus
    // mapping(uint256 => bool) public claimed;
    mapping(address => address) public collections;

    event NewCollection(address contractAddress);

    function newCollection(address _owner) external payable returns (address addr) {
        // uint256 tokenId = _tokenIdCounter.current();
        // address contractAddress = new ERC721("MidasToken", "MTK");
        // collections.push(token);
        // console.log(token);
        // emit NewCollection("Created");
        bytes memory bytecode = type(MidasToken).creationCode;
        // bytecode = abi.encodePacked(bytecode, abi.encode('MidasToken', 'MTK'));

        assembly {
            addr := create(callvalue(), add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), '[ERRO] Deploy failed!');

        collections[addr] = _owner;
        emit NewCollection(addr);
    }
}
