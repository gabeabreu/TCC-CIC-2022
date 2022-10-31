const Sidebar = ({ setIsDrawerOpen }: any) => {
  return (
    <div className="bg-mds-gray-400 flex px-4">
      <i
        onClick={() => setIsDrawerOpen(true)}
        className="fa-solid fa-filter text-mds-white text-2xl mt-16 cursor-pointer"
      />
    </div>
  );
};

export default Sidebar;
