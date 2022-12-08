import { useFormikContext } from 'formik';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ReactCrop, { Crop, centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import Modal from './Modal';
import 'react-image-crop/dist/ReactCrop.css';
import Button from './Button';
import { useTranslation } from 'next-i18next';

interface Props {
  autoFocus?: any;
  className?: string;
  type?: string;
  name: string;
  label?: string;
  width?: number;
  placeholder?: string;
  disableErrorMessage?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  description?: string;
  mask?: string;
  descriptionMarginBottom?: number;
  textArea?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  autoComplete?: boolean;
  resize?: boolean;
}

const FileInput = ({
  required,
  className,
  autoFocus,
  name,
  label,
  placeholder,
  disableErrorMessage,
  secureTextEntry,
  description,
  rows = 1,
  disabled,
  type,
  pattern,
  textArea,
  autoComplete,
  resize,
}: Props) => {
  const { t } = useTranslation();
  const { values, errors, touched, setErrors, setValues } = useFormikContext<any>();

  const [pressed, setPress] = useState<boolean>(false);
  const error = errors[name];
  const showError = touched[name] && !!error;
  const showContent = secureTextEntry && pressed;

  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [isCropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [output, setOutput] = useState('');

  function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
          height: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onSelectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setCropModalOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: any) {
    const { width, height } = e.currentTarget;
    if (width) setCrop(centerAspectCrop(width, height, 1));
  }

  const cropImageNow = () => {
    if (crop) {
      const canvas = document.createElement('canvas');

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      if (!completedCrop) {
        throw new Error('No completed crop');
      }

      if (!imgRef.current) {
        throw new Error('No image ref');
      }

      const imgNaturalWidth = imgRef?.current?.naturalWidth || 0;
      const imgWidth = imgRef?.current?.width || 0;

      const imgNaturalHeight = imgRef?.current?.naturalHeight || 0;
      const imgHeight = imgRef?.current?.height || 0;

      const scaleX = imgNaturalWidth / imgWidth;
      const scaleY = imgNaturalHeight / imgHeight;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = 'high';

      const cropX = completedCrop.x * scaleX;
      const cropY = completedCrop.y * scaleY;

      const centerX = imgNaturalWidth / 2;
      const centerY = imgNaturalHeight / 2;

      ctx.save();

      // Move the crop origin to the canvas origin (0,0)
      ctx.translate(-cropX, -cropY);
      // Move the origin to the center of the original position
      ctx.translate(centerX, centerY);
      // Scale the image
      ctx.scale(1, 1);
      // Move the center of the image to the origin (0,0)
      ctx.translate(-centerX, -centerY);

      ctx.drawImage(
        imgRef.current,
        0,
        0,
        imgNaturalWidth,
        imgNaturalHeight,
        0,
        0,
        imgNaturalWidth,
        imgNaturalHeight
      );

      ctx.restore();

      // Converting to base64
      const base64Image = canvas.toDataURL('image/jpeg');
      setValues({ ...values, [name]: base64Image });
    }
  };

  return (
    <div className="flex flex-col">
      <Modal
        title="Crop image"
        showModal={isCropModalOpen}
        onCloseModal={() => setCropModalOpen(false)}
      >
        <div className="flex flex-col relative w-full justify-center">
          <div className="flex relative bg-mds-gray-500 rounded-xl overflow-hidden justify-center">
            <ReactCrop
              crop={crop}
              className="rounded-xl overflow-hidden"
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              maxHeight={512}
              maxWidth={512}
              aspect={1}
            >
              <div className="flex max-w-[31.25rem] max-h-[31.25rem]">
                <img
                  className="object-contain"
                  ref={imgRef}
                  onLoad={onImageLoad}
                  alt={name}
                  src={imgSrc}
                />
              </div>
            </ReactCrop>
          </div>
          <Button
            onClick={() => {
              cropImageNow();
              setCropModalOpen(false);
            }}
            className="mt-6 bg-mds-purple hover:bg-mds-dark-purple"
          >
            <span>{t('CROP')}</span>
          </Button>
        </div>
      </Modal>

      {label && (
        <label className="mb-2 block text-lg font-medium text-mds-white">
          {label}
          {required && <span className="ml-1 text-mds-red">*</span>}
        </label>
      )}
      <div
        className={`${className} ${
          error ? 'border-mds-dark-red' : 'border-mds-gray-200'
        } flex p-4 flex-col items-center justify-center w-full rounded-md border-2 border-dashed bg-mds-gray-500 duration-500`}
      >
        {values[name] ? (
          <div className="flex relative w-full h-full rounded-lg overflow-hidden">
            <Image alt={name} src={values[name]} layout="fill" />
          </div>
        ) : (
          <>
            <svg
              width="34"
              height="36"
              viewBox="0 0 34 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.6663 24.6667C7.02466 24.6685 5.44006 24.0646 4.21608 22.9705C2.99211 21.8765 2.21483 20.3693 2.03315 18.7378C1.85148 17.1062 2.27819 15.465 3.23153 14.1285C4.18487 12.7921 5.5978 11.8543 7.19964 11.495C6.73617 9.33349 7.15034 7.07639 8.35105 5.22025C9.55175 3.36411 11.4406 2.06097 13.6021 1.5975C15.7637 1.13404 18.0207 1.54821 19.8769 2.74892C21.733 3.94962 23.0362 5.83849 23.4996 8H23.6663C25.7329 7.99793 27.7265 8.76381 29.2602 10.149C30.7939 11.5341 31.7581 13.4397 31.9658 15.4958C32.1735 17.552 31.6098 19.6119 30.3841 21.2758C29.1584 22.9397 27.3582 24.0888 25.333 24.5M21.9996 19.6667L16.9996 14.6667M16.9996 14.6667L11.9996 19.6667M16.9996 14.6667V34.6667"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex mt-2 text-sm">
              <label
                htmlFor={`fileupload` + name}
                className="relative cursor-pointer rounded-md font-medium text-mds-white outline-none hover:text-mds-purple duration-300"
              >
                <span>Click to upload</span>
                <input
                  id={`fileupload` + name}
                  name={name}
                  type="file"
                  className="sr-only"
                  onChange={onSelectFile}
                  onClick={() => {
                    const newErrors = { ...errors };
                    delete newErrors[name];
                    setErrors(newErrors);
                  }}
                />
              </label>
              <p className="pl-1 text-mds-gray-100">or drag and drop</p>
            </div>
            <p className="mt-1 text-xs text-mds-gray-200">SVG, PNG, JPG or GIF (MAX. 512x512px)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileInput;
