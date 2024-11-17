const Footer = () => {
    return <>
        <div className="Fixed bottom-0 shadow-md shadow-black flex items-center justify-evenly p-1 bg-black my-1 cursor-pointer">
            {/* first grid */}
            <div className="flex flex-col items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500   to-teal-500 text-4xl font-serif font-bold">@YIBEE</span>
                <p className="text-white font-serif">All rights reserved</p>
            </div>
            <div className="text-white text-md font-semibold">
                <ul>About</ul>
                <ul>Contact</ul>
                <ul>Instagram</ul>
                <ul>X</ul>
                
            </div>
            {/* second grid */}
            <div className="text-white text-md font-semibold">
                <ul>Privay Policy</ul>
                <ul>Feedback</ul>
                <ul>LinkedIn</ul>
            </div>
        </div>
    </>
}
export default Footer;