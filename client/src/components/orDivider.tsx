

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-grow border-gray-300 border-t" />
      <span className="px-4 font-bold text-gray-500">{text}</span>
      <hr className="flex-grow border-gray-300 border-t" />
    </div>
  );
};

export default Divider;