import LoadingSpinner from '@/components/LoadingSpinner';
import Modal from '@/components/Modal';
import TransactionModal from '@/components/TransactionModal';
import { formatAddres } from '@/helpers/utils';
import useDebounce from '@/hooks/useDebounce';
import { setCreateData } from '@/redux/collection/actions';
import { NFTCollection } from '@/redux/collection/types';
import { useSelector } from '@/redux/hooks';
import factoryABI from '@/utils/contractInterfaces/factoryABI';
import tokenABI from '@/utils/contractInterfaces/tokenABI';
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
  const [enableTransfer, setEnableTransfer] = useState(false);
  const [generalStatus, setGeneralStatus] = useState('idle');
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [fromAddress, setFromAddress] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [nftMetadata, setNftMetadata] = useState<any>();

  useEffect(() => {
    // @ts-ignore
    if (chain) setSelectedNetworkConfig(networkConfig[chain.id]);
  }, [chain]);

  const initialValues: any = {
    tokenHash: '',
  };

  async function handleSubmit(value: string) {
    const { data }: AxiosResponse = await axios.get('/api/alchemy/getNFTMetadata', {
      params: {
        address: value.substring(0, 42),
        tokenId: value.substring(42),
      },
    });

    setNftMetadata(data);
    setFromAddress(value.substring(0, 42));
    setTokenId(Number(value.substring(42)));

    setTimeout(() => {
      setEnableTransfer(true);
      setLoading(true);
      setRedeemModalOpen(true);
    }, 500);
  }

  // APPROVE TOKENS HOOK CALLS
  const { config: transferConfig, status: transferStatus } = usePrepareContractWrite({
    address: selectedNetworkConfig.midasFactoryAddress,
    abi: factoryABI,
    functionName: 'redeemToken',
    args: [fromAddress, address, tokenId],
    enabled: enableTransfer,
  });

  const { data: transferData, write: transferWrite } = useContractWrite(transferConfig as any);

  const { status: transferTxStatus, data: transferTxData } = useWaitForTransaction({
    hash: transferData?.hash,
  });

  useEffect(() => {
    if (transferStatus === 'success' && enableTransfer) {
      transferWrite?.();
      setGeneralStatus('transfering');
    }
  }, [transferStatus, enableTransfer]);

  useEffect(() => {
    if (transferTxStatus === 'success' || transferTxStatus === 'error') {
      setLoading(false);
      setEnableTransfer(false);
      setGeneralStatus('success');
    }
  }, [transferTxStatus]);
  console.log(nftMetadata);
  return (
    <div className="flex flex-col">
      <TransactionModal
        isLoading={isLoading}
        showModal={isRedeemModalOpen}
        onCloseModal={() => setRedeemModalOpen(false)}
        data={{
          name: nftMetadata?.metadata?.name,
          image: nftMetadata?.metadata?.image || '/assets/accountPage/profilePicture.svg',
          status: generalStatus,
          details: [
            { name: 'Collection name', value: nftMetadata?.contractMetadata?.name },
            { name: 'Collection address', value: formatAddres(nftMetadata?.contract?.address) },
            { name: 'Token id', value: Number(nftMetadata?.id?.tokenId) },
          ],
        }}
      />
      <div className="flex flex-col p-[5rem] my-32 border-gradient">
        <span className="absolute -top-[2.45rem] left-[6.5rem] w-[29.6rem] lg:left-[5.45rem] lg:w-[20.5rem] xl:left-[7.1rem] xl:w-[26.75rem] 2xl:left-[8.7rem] 2xl:w-[32.5rem] h-10 px-4 bg-mds-gray-500 duration-500" />
        <h1 className="absolute -top-8 lg:-top-8 xl:-top-11 2xl:-top-14 lg:left-[6.5rem] xl:left-[8.5rem] 2xl:left-[10.4rem] create-section-title duration-500">
          <span className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8F33E7] to-[#F81DFB]">
            {t('REDEEM_SECTION_TITLE1')}
          </span>
          {t('REDEEM_SECTION_TITLE2')}
        </h1>
        <h2 className="create-section-subtitle">{t('REDEEM_SECTION_SUBTITLE')}</h2>
        <span className="create-section-description">
          {t('REDEEM_SECTION_DESCRIPTION1')}
          <a href="https://ethereum.org/pt-br/nft/" target="blank">
            {t('REDEEM_SECTION_DESCRIPTION2')}
            <i className="fa-regular fa-arrow-up-right-from-square ml-2" />
          </a>
        </span>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit({ ...values })}
          {...formSchema}
        >
          <Form className="mt-6">
            <InputFormik
              required
              name="tokenHash"
              className="bg-mds-gray-300"
              label="Redeem hash"
              placeholder="e4fa1555ad877bf0...0a93eff2f95a6198"
              withButton
              onSubmit={(value: any) => handleSubmit(value)}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RedeemSection;
