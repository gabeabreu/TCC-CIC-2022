// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './MidasToken.sol';
import 'erc721a/contracts/IERC721A.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract MidasFactory is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => address) public collections;

    event NewCollection(address contractAddress);
    event TokenRedeemd(address fromAddress, address toAddress, uint256 tokenId);

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

        // IERC721A(addr).setApprovalForAll(address(this), true);

        collections[addr] = _owner;
        emit NewCollection(addr);
    }

    // function redeemToken(
    //     address _tokenContractAddr,
    //     address _toAddr,
    //     uint256 _tokenId
    // ) external {
    //     address fromAddr = collections[_tokenContractAddr];

    //     console.log(fromAddr);
    //     console.log(_toAddr);
    //     console.log(_tokenId);

    //     // (bool success, bytes memory data) = _tokenContractAddr.call(
    //     //     abi.encodeWithSignature(
    //     //         "transferFrom(address,address,uint256)",
    //     //         fromAddr,
    //     //         _toAddr,
    //     //         _tokenId
    //     //     )
    //     // );

    //     // IERC20(_token) this will initialize the contract
    //     IERC721A(_tokenContractAddr).transferFrom(fromAddr, _toAddr, _tokenId);

    //     emit TokenRedeemd(fromAddr, _toAddr, _tokenId);
    // }

    // function getOwnerAndAprovall(
    //     address _tokenContractAddr,
    //     uint256 _tokenId,
    //     address _to
    // ) external {
    //     address fromAddr = collections[_tokenContractAddr];

    //     address ownerOf = IERC721A(_tokenContractAddr).ownerOf(_tokenId);
    //     bool isAprroved = IERC721A(_tokenContractAddr).isApprovedForAll(fromAddr, _to);

    //     console.log(fromAddr);
    //     console.log(isAprroved);
    // }
}
