import LoadingSpinner from '@/components/LoadingSpinner';
import Modal from '@/components/Modal';
import TransactionModal from '@/components/TransactionModal';
import { formatAddres } from '@/helpers/utils';
import useDebounce from '@/hooks/useDebounce';
import { setCreateData } from '@/redux/collection/actions';
import { NFTCollection } from '@/redux/collection/types';
import { useSelector } from '@/redux/hooks';
import factoryABI from '@/utils/contractInterfaces/factoryABI';
import { networkConfig } from '@/utils/networkConfig';
import axios, { AxiosResponse } from 'axios';
import BN from 'bn.js';
import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAccount,
  useContractEvent,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import Button from '../../Button';
import FileInput from '../../FileInput';
import InputFormik from '../../InputFormik';
import RarityCardImage from '../RarityCardImage';
import formSchema from './formSchema';

const statusColor = {
  error: '#F2A2A2',
  idle: '#A1A1A1',
  success: '#C5F2A2',
  loading: '#F2CDA2',
};

const RedeemSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state);
  const { createData } = collection;
  const { chain } = useNetwork();
  const { address } = useAccount();

  const [newCollectionArgs, setNewCollectionArgs] = useState<any>([]);

  const [selectedNetworkConfig, setSelectedNetworkConfig] = useState(networkConfig[0]);
  const [enableNewCollection, setEnableNewCollection] = useState(false);
  const [isCreatingModalOpen, setCreatingModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (chain) setSelectedNetworkConfig(networkConfig[chain.id]);
  }, [chain]);

  const initialValues: any = {
    tokenHash: '',
  };

  function handleSubmit(values: any) {
    console.log(values);

    // dispatch(setCreateData(data));

    // setCreatingModalOpen(true);
    // setLoading(true);
  }

  const {
    config: newCollectionConfig,
    status: newCollectionStatus,
    data,
  } = usePrepareContractWrite({
    address: selectedNetworkConfig.midasFactoryAddress,
    abi: factoryABI,
    functionName: 'newCollection',
    args: [...newCollectionArgs],
    enabled: enableNewCollection,
  });

  const { data: newCollectionData, write: newCollectionWrite } = useContractWrite(
    newCollectionConfig as any
  );

  const {
    isLoading: isTxLoading,
    isSuccess,
    status,
    data: trasactionData,
  } = useWaitForTransaction({
    hash: newCollectionData?.hash,
    onSuccess(data) {
      console.log('Success', data);
    },
  });

  useEffect(() => {
    if (newCollectionStatus === 'success' && enableNewCollection) {
      newCollectionWrite?.();
    }
  }, [newCollectionStatus, enableNewCollection]);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setLoading(false);
      setEnableNewCollection(false);
    }
  }, [status]);

  return (
    <div className="flex flex-col">
      <TransactionModal
        isLoading={false}
        showModal={true}
        data={{ name: 'Test', image: '/assets/coinbase.svg', status: 'loading' }}
      />
      <div className="flex flex-col p-[5rem] my-32 border-gradient">
        <span className="absolute -top-[2.45rem] left-[6.5rem] w-[29.6rem] lg:left-[5.45rem] lg:w-[23.9rem] xl:left-[7.1rem] xl:w-[31.35rem] 2xl:left-[8.7rem] 2xl:w-[38rem] h-10 px-4 bg-mds-gray-500 duration-500" />
        <h1 className="absolute -top-8 lg:-top-8 xl:-top-11 2xl:-top-14 lg:left-[6.5rem] xl:left-[8.5rem] 2xl:left-[10.4rem] create-section-title duration-500">
          <span className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8F33E7] to-[#F81DFB]">
            {t('CREATE_SECTION_TITLE1')}
          </span>
          {t('CREATE_SECTION_TITLE2')}
        </h1>
        <h2 className="create-section-subtitle">{t('CREATE_SECTION_SUBTITLE')}</h2>
        <span className="create-section-description">
          {t('CREATE_SECTION_DESCRIPTION1')}
          <a href="https://ethereum.org/pt-br/nft/" target="blank">
            {t('CREATE_SECTION_DESCRIPTION2')}
            <i className="fa-regular fa-arrow-up-right-from-square ml-2" />
          </a>
        </span>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit({ ...values })}
          {...formSchema}
        >
          <InputFormik
            required
            name="prompt"
            className="bg-mds-gray-300"
            label="Give a detailed description of your product"
            placeholder="flying rolex watch digital art"
            withButton
            onSubmit={(value: any) => console.log(value)}
          />
        </Formik>
      </div>
    </div>
  );
};

export default RedeemSection;
