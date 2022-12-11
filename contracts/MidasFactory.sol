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

    mapping(address => address) public collections;

    event NewCollection(address contractAddress);

    function newCollection(
        address _owner,
        string memory _name,
        uint256 _supply,
        string memory _collectionURI,
        uint256[] memory _itemsQuantities,
        string[] memory _itemsURIs
    ) external payable returns (address addr) {
        bytes memory bytecode = type(MidasToken).creationCode;

        bytecode = abi.encodePacked(
            bytecode,
            abi.encode(_owner, _name, _supply, _collectionURI, _itemsQuantities, _itemsURIs)
        );

        assembly {
            addr := create(callvalue(), add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), '[ERRO] Deploy failed!');

        collections[addr] = _owner;
        emit NewCollection(addr);
    }
}
