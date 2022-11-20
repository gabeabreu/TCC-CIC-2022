interface Props {
  title: string;
  text: string;
}

const AboutCard = ({ title, text }: Props) => {
  return (
    <div className="w-[19rem] relative flex flex-col rounded-t-3xl bg-gradient-to-b from-mds-purple via-[#532180] to-[#301742]">
      <div className="pt-10 pb-14 px-12 flex flex-col">
        <span className="font-extrabold text-7xl text-mds-white">{title}</span>
        <span className="text-mds-white font-light text-3xl">{text}</span>
      </div>
      <div className="w-full absolute bottom-0 bg-gradient-to-r from-[#8F33E7] to-[#5A0068] h-[0.25rem]" />
    </div>
  );
};

export default AboutCard;
