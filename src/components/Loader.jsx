const Loader = () => {
    return <>
        {/* flex items-center justify-center h-screen w-screen flex-col */}
        <div className="">
            <h1 className="text-center font-serif font-bold text-xl "><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">Please Wait.....</span></h1>
            <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Loader;