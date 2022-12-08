const ProgressBar = ({ progressValue }: any) => {
  return (
    <div className="h-5 w-full bg-zinc-500 rounded-full m-12">
      <div
        style={{ width: `${String(progressValue)}%` }}
        className={`h-full bg-mds-purple rounded-full duration-300`}
      ></div>
    </div>
  );
};

export default ProgressBar;
