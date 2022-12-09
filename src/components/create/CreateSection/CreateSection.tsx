import Modal from '@/components/Modal';
import useDebounce from '@/hooks/useDebounce';
import { setCreateData } from '@/redux/collection/actions';
import { NFTCollection } from '@/redux/collection/types';
import { useSelector } from '@/redux/hooks';
import { factoryABI } from '@/utils/contractInterfaces/factoryABI';
import axios, { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAccount,
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

const CreateSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state);
  const { createData } = collection;
  const { chain } = useNetwork();
  const { address } = useAccount();

  const [generatedImages, setGeneratedImages] = useState([
    { id: 1, rarity: 'Common', src: '' },
    { id: 2, rarity: 'Rare', src: '' },
    { id: 3, rarity: 'Super Rare', src: '' },
    { id: 3, rarity: 'Epic', src: '' },
    { id: 4, rarity: 'Legend', src: '' },
  ]);
  const [enableNewCollection, setEnableNewCollection] = useState(false);
  const [isCreatingModalOpen, setCreatingModalOpen] = useState(false);

  const initialValues: any = {
    collectionImage: '/assets/coinbase.svg',
    name: 'MyTestCollection',
    itemSupply: 100,
    itemName: 'MyTestNFT',
  };

  function handleSubmit(values: NFTCollection) {
    dispatch(setCreateData(values));
    setEnableNewCollection(true);
    // refetch();
  }

  async function generateImage(prompt: string) {
    const { data }: AxiosResponse = await axios.get('/api/openai/generate', { params: { prompt } });

    const newGeneratedImages = [...generatedImages];

    setGeneratedImages(
      newGeneratedImages.map((image) => {
        return { ...image, src: data.data[image.id - 1].url };
      })
    );
  }

  const { config: newCollectionConfig, status: newCollectionStatus } = usePrepareContractWrite({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: factoryABI,
    functionName: 'newCollection',
    args: [address, createData.data?.name || ''],
    enabled: enableNewCollection,
  });

  const { data: newCollectionData, write: newCollectionWrite } =
    useContractWrite(newCollectionConfig);

  const { isLoading, isSuccess, data } = useWaitForTransaction({
    hash: newCollectionData?.hash,
  });

  useEffect(() => {
    if (newCollectionStatus === 'success' && enableNewCollection) {
      newCollectionWrite?.();
    }
  }, [newCollectionStatus, enableNewCollection]);

  useEffect(() => {
    if (isLoading) setCreatingModalOpen(true);
  }, [isLoading]);

  console.log(data);
  return (
    <div className="flex flex-col">
      <Modal showModal={isCreatingModalOpen}>
        <div>Transaçao em andamento</div>
      </Modal>
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
          {({ values, errors }) => {
            return (
              <Form className="flex flex-col mt-10">
                <>
                  <div className="flex gap-x-10 w-full mb-8">
                    <FileInput
                      required
                      label="Upload cover image"
                      name="collectionImage"
                      className="w-[18rem] h-[18rem]"
                    />
                    <div className="flex flex-col w-full gap-y-5">
                      <InputFormik required name="name" label="Name" placeholder="Bored ape" />
                      <InputFormik name="royaltyAmount" label="Royalty amount" placeholder="10%" />
                      <InputFormik
                        name="royaltyAddressReceiver"
                        label="Royalty receiver"
                        placeholder="0xaAD20f129e449C1fb2F45bE27Fe68A64389..."
                      />
                    </div>
                  </div>
                  <InputFormik
                    name="description"
                    label="Description"
                    placeholder="This collection is about..."
                    textArea
                    rows={5}
                  />

                  <div className="select-disable relative flex flex-col mt-5 w-[100% + 10rem] h-[15rem] -mx-[5rem]">
                    <Image
                      src="/assets/createPage/region-separator.svg"
                      layout="fill"
                      alt="region-divisor"
                    />
                  </div>
                  <h2 className="create-section-subtitle -mt-12">
                    {t('CREATE_SECTION_ITEMS_SUBTITLE')}
                  </h2>
                  <span className="create-section-description">
                    {t('CREATE_SECTION_ITEMS_DESCRIPTION1')}
                    <a href="https://ethereum.org/pt-br/nft/" target="blank">
                      {t('CREATE_SECTION_ITEMS_DESCRIPTION2')}
                      <i className="fa-regular fa-arrow-up-right-from-square ml-2" />
                    </a>
                  </span>
                  <div className="mt-6">
                    <InputFormik
                      required
                      name="prompt"
                      className="bg-mds-gray-300"
                      label="Give a detailed description of your product"
                      placeholder="flying rolex watch digital art"
                      withButton
                      onSubmit={(value: any) => generateImage(value)}
                    />
                  </div>
                  <ul className="flex flex-wrap w-full justify-center mt-6 gap-6 2xl:gap-10 duration-500">
                    {generatedImages.map((image) => (
                      <li key={image.rarity}>
                        <RarityCardImage image={image} />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex w-full gap-x-6 2xl:gap-x-10">
                    <InputFormik required name="itemName" label="Name" placeholder="Bored ape" />
                    <InputFormik required name="itemSupply" label="Supply" placeholder="500" />
                  </div>
                  <InputFormik
                    name="itemLink"
                    label="External link"
                    placeholder="https://dominio.com"
                  />
                  <InputFormik
                    name="itemDescription"
                    label="Description"
                    placeholder="This item is about..."
                    textArea
                    rows={5}
                  />
                  <Button
                    type="submit"
                    className="bg-mds-purple hover:bg-mds-dark-purple w-[15rem] ml-auto rounded-md mt-10"
                  >
                    <span>{t('CREATE')}</span>
                  </Button>
                </>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* <Button onClick={() => generateImage('orange cat')}>
          <span>Send</span>
        </Button> */}
      {/* <input
        onChange={(e) => {
          if (e.target.files?.[0]) {
            getBase64(e.target.files?.[0]);
          }
        }}
        type="file"
        accept="image/png, image/jpeg"
      /> */}
    </div>
  );
};

export default CreateSection;
