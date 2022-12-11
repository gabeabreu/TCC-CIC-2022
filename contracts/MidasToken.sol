// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'erc721a/contracts/ERC721A.sol';
import './ERC721AURIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import 'hardhat/console.sol';

// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, MyCol,  10, comLink, rarLink, srarLink, epcLink, lgnLink
// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, Collection, 10, https://gateway.pinata.cloud/ipfs/QmZBeXNzrTnuk7EYEZhKGiyQPmWdrfu6E5tt7TpkkVpjtv, [4,3,1,1,1], [https://gateway.pinata.cloud/ipfs/QmZsbkdNUiAAJE9j4yVVfS2cwSdozkZk5STiY8tDV7oe4j,https://gateway.pinata.cloud/ipfs/Qmao3QxDsPaf5Tjb6AfLXLLQjsTid51d1967jdWUSQ6PLC,https://gateway.pinata.cloud/ipfs/QmZiCTwr7YvcYUyEo9HuHPcEMGHncf11NUPVKu1g79GZA1,https://gateway.pinata.cloud/ipfs/Qmcw3PDeDVG9iQ8Cg6QswXpvoBd1X8ujgn4bTMJKPYr1FH,https://ipfs.io/ipfs/QmXL8JS8dRY8NarE2CkWet6429YQpKggUJjhKHwZnyn8dR]

contract MidasToken is ERC721A, ERC721AURIStorage, Ownable {
    uint256 public constant COMMON = 0;
    uint256 public constant RARE = 1;
    uint256 public constant SUPER_RARE = 2;
    uint256 public constant EPIC = 3;
    uint256 public constant LEGEND = 4;
    string collectionURI = '';

    constructor(
        address _owner,
        string memory _name,
        uint256 _supply,
        string memory _collectionURI,
        uint256[] memory _itemsQuantities,
        string[] memory _itemsURIs
    ) ERC721A(_name, 'MTK') {
        uint256 idCount = 0;
        collectionURI = _collectionURI;

        // Batch mint by supply amount
        _mint(_owner, _supply);

        // Set tokens URI by rarity
        for (uint256 i = 0; i < _itemsQuantities[0]; i++) {
            _setTokenURI(idCount, _itemsURIs[0]);
            idCount += 1;
        }
        for (uint256 i = 0; i < _itemsQuantities[1]; i++) {
            _setTokenURI(idCount, _itemsURIs[1]);
            idCount += 1;
        }
        for (uint256 i = 0; i < _itemsQuantities[2]; i++) {
            _setTokenURI(idCount, _itemsURIs[2]);
            idCount += 1;
        }
        for (uint256 i = 0; i < _itemsQuantities[3]; i++) {
            _setTokenURI(idCount, _itemsURIs[3]);
            idCount += 1;
        }
        for (uint256 i = 0; i < _itemsQuantities[4]; i++) {
            _setTokenURI(idCount, _itemsURIs[4]);
            idCount += 1;
        }
    }

    function contractURI() public view returns (string memory) {
        return collectionURI;
    }

    function _burn(uint256 tokenId) internal override(ERC721A, ERC721AURIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721A, ERC721AURIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
