import axios, { AxiosResponse } from 'axios';
import Button from '../Button';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-4lZnvA6eULOBKFuFSj6SzFlP',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const CreateSection = () => {
  function getBase64(file: any) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      const file = reader.result as any;
      file.name = 'image.png';

      axios.post(
        'https://api.openai.com/v1/images/variations',
        {
          image: reader.result,
          n: 1,
          size: '256x256',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            'OpenAI-Organization': 'org-4lZnvA6eULOBKFuFSj6SzFlP',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // if (typeof reader.result === 'string') {
      //   callApi(reader.result);
      // }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  return (
    <div className="flex flex-col">
      <input
        onChange={(e) => {
          if (e.target.files?.[0]) {
            getBase64(e.target.files?.[0]);
          }
        }}
        type="file"
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default CreateSection;
