function MicPage() {
    return (        
        <div className="w-96 h-[956px] bg-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
        <div className="flex-1 self-stretch inline-flex flex-col justify-center items-start overflow-hidden">
            <div className="w-96 h-[921px] max-w-[896px] flex flex-col justify-start items-start">
            <div className="self-stretch flex-1 px-4 py-14 flex flex-col justify-center items-center">
                <div className="flex-1 flex flex-col justify-center items-center gap-12">
                <div className="w-48 h-48 relative inline-flex justify-center items-center">
                    <div className="w-48 h-48 left-0 top-0 absolute bg-sky-500/10 rounded-full" />
                    <div className="w-40 h-40 left-[16px] top-[16px] absolute bg-sky-500/20 rounded-full" />
                    <div className="w-32 h-32 bg-sky-500 rounded-full flex justify-center items-center">
                    <div className="inline-flex flex-col justify-start items-start">
                        <div className="w-8 h-14 outline outline-[5px] outline-offset-[-2.50px] outline-white" />
                    </div>
                    </div>
                </div>
                <div className="pt-5 inline-flex justify-center items-start gap-6">
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex justify-center items-center">
                    <div className="inline-flex flex-col justify-start items-start">
                        <div className="w-8 h-7 outline outline-[5px] outline-offset-[-2.50px] outline-slate-600" />
                    </div>
                    </div>
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex justify-center items-center">
                    <div className="inline-flex flex-col justify-start items-start">
                        <div className="w-7 h-7 outline outline-[5px] outline-offset-[-2.50px] outline-slate-600" />
                    </div>
                    </div>
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex justify-center items-center">
                    <div className="inline-flex flex-col justify-start items-start">
                        <div className="w-7 h-7 outline outline-[5px] outline-offset-[-2.50px] outline-slate-600" />
                    </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                    <div className="text-center justify-center text-slate-600 text-lg font-normal font-['Poppins'] leading-7">Listening... Speak now</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default MicPage;