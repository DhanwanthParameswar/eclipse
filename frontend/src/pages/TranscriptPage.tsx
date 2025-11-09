function TranscriptPage() {
  return (
      <div className="w-96 h-[956px] p-5 bg-slate-50 inline-flex flex-col justify-start items-start">
      <div className="self-stretch flex-1 px-5 inline-flex justify-center items-center">
        <div className="flex-1 h-[903px] pt-20 relative inline-flex flex-col justify-start items-center">
          <div className="self-stretch flex flex-col justify-center items-center gap-2">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch text-center justify-center text-slate-900 text-4xl font-bold font-['Poppins'] leading-10">Transcript</div>
            </div>
            <div className="self-stretch h-16 py-5" />
          </div>
          <div className="self-stretch h-[555px] pb-5 flex flex-col justify-start items-start gap-8 overflow-hidden">
            <div className="self-stretch px-3 py-2 bg-slate-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                <div className="justify-center text-black text-sm font-normal font-['Sora'] leading-6">Hi</div>
              </div>
            </div>
          </div>
          <div className="w-96 pt-4 left-0 top-[769px] absolute border-t border-slate-200 inline-flex justify-end items-start">
            <div className="px-9 py-3 left-[80px] top-[17px] absolute bg-sky-500 rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2.5">
              <div className="text-center justify-center text-white text-lg font-semibold font-['Sora'] leading-6">View Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranscriptPage;