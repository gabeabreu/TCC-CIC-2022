import axios, { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';

import Button from '../Button';
import FileInput from '../FileInput';

const CreateSection = () => {
  // function getBase64(file: any) {
  //   var reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onload = function () {
  //     const file = reader.result as any;
  //     file.name = 'image.png';

  //     axios.post(
  //       'https://api.openai.com/v1/images/variations',
  //       {
  //         image: reader.result,
  //         n: 1,
  //         size: '256x256',
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  //           'OpenAI-Organization': 'org-4lZnvA6eULOBKFuFSj6SzFlP',
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //   };

  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // }

  const { t } = useTranslation();

  async function generateImage(prompt: string) {
    const data: AxiosResponse = await axios.get('/api/openai/generate', { params: { prompt } });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-[4rem] mt-32 border-gradient">
        <span className="absolute -top-[2.45rem] left-[6.5rem] w-[29.6rem] h-10 px-4 bg-mds-gray-500" />
        <h1 className="absolute -top-8 left-[7.75rem] create-section-title">
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
        <form className="mt-10">
          <FileInput />
        </form>
        <Button onClick={() => generateImage('orange cat')}>
          <span>Send</span>
        </Button>
      </div>
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
