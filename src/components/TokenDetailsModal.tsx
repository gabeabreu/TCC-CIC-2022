import { formatAddres } from '@/helpers/utils';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import { useAccount } from 'wagmi';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';

interface Props {
  data: {
    collectionName: string;
    collectionAddress: string;
    owner: string;
    tokenAddress: string;
    tokenId: string;
    name: string;
    description: string;
    rarity: string;
    details?: any[];
  };
  isLoading: boolean;
  showModal: boolean;
  onCloseModal?: () => void;
}

const TokenDetailsModal = ({ data, isLoading, showModal, onCloseModal }: Props) => {
  const { t } = useTranslation();
  const { address } = useAccount();

  const rarityColors = [
    { value: 'Common', color: '#FFFFFF' },
    { value: 'Rare', color: '#C5F2A2' },
    { value: 'Super Rare', color: '#D8A2F2' },
    { value: 'Epic', color: '#F2A2A2' },
    { value: 'Legend', color: '#F2CDA2' },
  ];

  return (
    <Modal
      showModal={showModal}
      title="Token details"
      footer={
        <Button
          disabled={isLoading}
          onClick={onCloseModal}
          className={`${
            isLoading ? '' : 'hover:bg-black'
          } flex w-full items-center justify-center h-11 bg-mds-black`}
        >
          {isLoading ? <LoadingSpinner size={16} /> : t('CLOSE')}
        </Button>
      }
      onCloseModal={onCloseModal}
    >
      <div className="flex w-full items-center gap-x-5 rounded-xl px-8 py-5 bg-[#43186B]">
        <div className="relative flex w-[7rem] h-[7rem] rounded-lg overflow-hidden">
          <Image src={data.image || ''} layout="fill" alt="region-divisor" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#ffffffaf] text-lg">Name</span>
          <span className="text-mds-white text-xl">{data?.name}</span>
        </div>
        <i className="fa-regular fa-arrow-right text-[#ffffff68] text-xl mx-5" />
        <div className="flex flex-col">
          <span className="text-[#ffffffaf] text-lg">Address</span>
          <span className="text-mds-white text-xl">{formatAddres(address || '')}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-y-3 mt-10">
        {data.details &&
          data.details.map((item) => (
            <li key={item.name}>
              <div className="flex w-full justify-between">
                <span className="text-mds-gray-200 text-base">{item.name}</span>
                <span className="text-mds-gray-100 text-base">{item.value}</span>
              </div>
            </li>
          ))}
        <div className="flex w-full justify-between">
          <span className="text-mds-gray-200 text-base">Status</span>
          <span style={{ color: statusColor[data.status as keyof StatusColor] }}>
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </span>
        </div>
      </ul>
    </Modal>
  );
};

export default TokenDetailsModal;
