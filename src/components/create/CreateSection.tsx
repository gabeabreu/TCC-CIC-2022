import axios, { AxiosResponse } from 'axios';
import Button from '../Button';

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

  async function generateImage(prompt: string) {
    const data: AxiosResponse = await axios.get('/api/openai/generate', { params: { prompt } });
  }

  return (
    <div className="flex flex-col">
      <Button onClick={() => generateImage('orange cat')}>
        <span>Send</span>
      </Button>
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
