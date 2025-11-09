function MainPage() {
    return (       
        <div className="w-96 h-[956px] bg-gray-50 inline-flex flex-col justify-start items-start">
        <div className="self-stretch flex-1 relative flex flex-col justify-start items-center">
            <div className="self-stretch h-28 px-48 py-6 flex flex-col justify-end items-center">
            <div className="w-full max-w-[1536px] pr-[0.01px] inline-flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                <div className="justify-center text-gray-800 text-5xl font-bold font-['Sora'] leading-7">Iris</div>
                </div>
            </div>
            </div>
            <div className="w-96 h-[849px] px-10 pt-5 pb-20 left-0 top-[54px] absolute flex flex-col justify-center items-center gap-5">
            <img className="w-52 h-48 rounded-[106px]" src="https://placehold.co/212x196" />
            <div className="self-stretch flex flex-col justify-start items-center">
                <div className="self-stretch text-center justify-center"><span className="text-gray-800 text-4xl font-bold font-['Sora'] leading-10">Meet Your New </span><span className="text-sky-500 text-4xl font-bold font-['Sora'] leading-10">AI<br/>Companion</span></div>
            </div>
            <div className="w-full max-w-[576px] pb-2.5 flex flex-col justify-start items-center">
                <div className="self-stretch text-center justify-center text-gray-500 text-xs font-normal font-['Poppins'] leading-5">Start a conversation and discover a smarter way to get things done. Our friendly AI is here to assist you 24/7.</div>
            </div>
            <div className="px-8 py-3 bg-sky-500 rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg inline-flex justify-center items-center overflow-hidden">
                <div className="text-center justify-center text-white text-lg font-semibold font-['Sora'] leading-7">Start Chatting Now</div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default MainPage;