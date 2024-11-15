const Footer = () => {
    return <>
        <div className="Fixed bottom-0 shadow-md shadow-black flex items-center justify-evenly p-1 bg-gradient-to-r from-slate-900 to-black my-1 cursor-pointer">
            {/* first grid */}
            <div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500   to-teal-500 text-5xl font-serif font-bold">YIBEE</span>
            </div>
            <div className="text-white text-md font-semibold">
                <ul>About</ul>
                <ul>Contact</ul>
                <ul>Instagram</ul>
                <ul>X</ul>
                <ul>LinkedIn</ul>
            </div>
            {/* second grid */}
            <div className="text-white text-md font-semibold">
                <ul>About</ul>
                <ul>Contact</ul>
                <ul>Instagram</ul>
                <ul>X</ul>
                <ul>LinkedIn</ul>
            </div>
            {/* third grid */}
            <div className="text-white text-md font-semibold">
                <ul>About</ul>
                <ul>Contact</ul>
                <ul>Instagram</ul>
                <ul>X</ul>
                <ul>LinkedIn</ul>
            </div>
        </div>
    </>
}
export default Footer;