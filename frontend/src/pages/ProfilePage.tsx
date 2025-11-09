function ProfilePage() {
    return (
        <div className="w-96 h-[956px] p-5 bg-slate-50 inline-flex flex-col justify-start items-start">
        <div className="self-stretch flex-1 px-5 inline-flex justify-center items-center">
            <div className="flex-1 h-[903px] inline-flex flex-col justify-center items-center">
            <div className="self-stretch flex flex-col justify-center items-center gap-2">
                <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch text-center justify-center text-slate-900 text-4xl font-bold font-['Sora'] leading-10">Your Profile</div>
                </div>
                <div className="self-stretch py-5 flex flex-col justify-start items-start">
                <div className="self-stretch h-6 text-center justify-center text-slate-500 text-base font-normal font-['Poppins'] leading-6">Enter your personal information and resume.</div>
                </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
                <div className="self-stretch flex flex-col justify-start items-center gap-8">
                <div className="self-stretch h-64 flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch justify-center text-slate-600 text-sm font-medium font-['Poppins'] leading-5">Full Name</div>
                    </div>
                    <div className="self-stretch px-3 py-2 bg-slate-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch justify-center text-slate-800 text-base font-normal font-['Poppins'] leading-6">Alex Doe</div>
                        </div>
                    </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch justify-center text-slate-600 text-sm font-medium font-['Poppins'] leading-5">Email Address</div>
                    </div>
                    <div className="self-stretch px-3 py-2 bg-slate-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch justify-center text-slate-800 text-base font-normal font-['Poppins'] leading-6">alex.doe@example.com</div>
                        </div>
                    </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch justify-center text-slate-600 text-sm font-medium font-['Poppins'] leading-5">Phone Number</div>
                    </div>
                    <div className="self-stretch px-3 py-2 bg-slate-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-300 flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch justify-center text-slate-800 text-base font-normal font-['Poppins'] leading-6">+1 (555) 123-4567</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="self-stretch h-64 flex flex-col justify-start items-start">
                    <div className="self-stretch pb-2 flex flex-col justify-start items-start">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch justify-center text-slate-600 text-sm font-medium font-['Poppins'] leading-5">Your Resume</div>
                    </div>
                    </div>
                    <div className="self-stretch h-56 p-0.5 bg-slate-50 rounded-lg outline outline-2 outline-offset-[-2px] outline-slate-300 flex flex-col justify-center items-center">
                    <div className="w-64 h-40 relative">
                        <div className="left-[111.73px] top-[29px] absolute inline-flex flex-col justify-start items-start">
                        <div className="w-10 h-7 outline outline-[3px] outline-offset-[-1.50px] outline-slate-400" />
                        </div>
                        <div className="pb-2 left-[16px] top-[68px] absolute inline-flex flex-col justify-start items-start">
                        <div className="flex flex-col justify-start items-center">
                            <div className="text-center justify-center"><span className="text-slate-500 text-sm font-semibold font-['Poppins'] leading-5">Click to upload</span><span className="text-slate-500 text-sm font-normal font-['Poppins'] leading-5"> or drag and drop</span></div>
                        </div>
                        </div>
                        <div className="left-[48.55px] top-[96px] absolute inline-flex flex-col justify-start items-center">
                        <div className="text-center justify-center text-slate-500 text-xs font-normal font-['Poppins'] leading-4">PDF, DOC, DOCX (MAX. 5MB)</div>
                        </div>
                        <div className="pt-4 left-[43.66px] top-[112px] absolute inline-flex flex-col justify-start items-start">
                        <div className="flex flex-col justify-start items-center">
                            <div className="text-center justify-center text-sky-500 text-xs font-medium font-['Poppins'] leading-4">resume_alex_doe_2024.pdf</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="self-stretch pt-4 relative border-t border-slate-200 inline-flex justify-end items-start">
                <div className="w-40 h-12 px-6 py-3 left-[95px] top-[17px] absolute bg-sky-500 rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-2.5">
                    <div className="text-center justify-center text-white text-lg font-semibold font-['Sora'] leading-6">Confirm</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ProfilePage;