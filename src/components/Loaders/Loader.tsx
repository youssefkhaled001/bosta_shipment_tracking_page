const Loader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-red animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-red animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-red animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default Loader;
