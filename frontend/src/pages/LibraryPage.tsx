function LibraryPage() {
    return (
        <div className="w-96 h-[956px] px-10 py-7 relative bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
        <div className="self-stretch pt-5 flex flex-col justify-start items-center gap-4">
            <div className="self-stretch h-11 relative inline-flex justify-start items-center gap-3.5">
            <div className="w-8 h-8 outline outline-[2.50px] outline-offset-[-1.25px] outline-sky-500" />
            <div className="inline-flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-center text-slate-900 text-2xl font-semibold font-['Sora'] leading-6">Alex Doe</div>
                </div>
            </div>
            <div className="px-2.5 py-0.5 left-[311px] top-[3.50px] absolute inline-flex flex-col justify-center items-end">
                <div className="w-7 h-9 relative">
                <div className="w-7 h-7 left-[1px] top-[3.50px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
                <div className="w-2.5 h-2.5 left-[10.01px] top-[13.17px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-black" />
                </div>
            </div>
            </div>
            <div className="self-stretch py-1 flex flex-col justify-start items-start">
            <div className="self-stretch h-11 min-w-40 flex flex-col justify-center items-start">
                <div className="self-stretch flex-1 rounded-lg inline-flex justify-start items-start">
                <div className="self-stretch pl-3 py-px bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-slate-300 flex justify-center items-center">
                    <div className="py-0.5 inline-flex flex-col justify-start items-start">
                    <div className="w-5 h-6 relative">
                        <div className="w-3.5 h-3.5 left-[2.50px] top-[4.50px] absolute bg-slate-500" />
                    </div>
                    </div>
                </div>
                <div className="flex-1 self-stretch relative bg-white rounded-tr-lg rounded-br-lg border-r border-t border-b border-slate-300 overflow-hidden">
                    <div className="h-3.5 pr-20 left-[8px] top-[12px] absolute inline-flex flex-col justify-start items-center overflow-hidden">
                    <div className="justify-center text-slate-500 text-sm font-normal font-['Poppins']">Search conversations...</div>
                    </div>
                    <div className="w-56 h-4 left-[8px] top-[13.50px] absolute" />
                </div>
                </div>
            </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="self-stretch px-3 py-2 bg-blue-500/10 rounded-lg inline-flex justify-start items-center gap-3">
                <div className="py-0.5 inline-flex flex-col justify-start items-start">
                <div className="w-5 h-6 relative">
                    <div className="w-5 h-4 left-[0.25px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                </div>
                </div>
                <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-center text-slate-900 text-sm font-medium font-['Poppins'] leading-5">Amazon</div>
                </div>
            </div>
            <div className="self-stretch px-3 py-2 rounded-lg inline-flex justify-start items-center gap-3">
                <div className="py-0.5 inline-flex flex-col justify-start items-start">
                <div className="w-5 h-6 relative">
                    <div className="w-5 h-4 left-[0.25px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-500" />
                </div>
                </div>
                <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-center text-slate-600 text-sm font-normal font-['Poppins'] leading-5">Google</div>
                </div>
            </div>
            </div>
        </div>
        <div className="w-36 h-36 left-[290px] top-[806px] absolute">
            <div className="w-24 h-24 left-0 top-0 absolute bg-sky-500 rounded-[20px] inline-flex justify-center items-center overflow-hidden">
            <div className="w-9 h-9 outline outline-[6px] outline-offset-[-3px] outline-white" />
            </div>
        </div>
        </div>
    );
}

export default LibraryPage;