const Popup=({Posted})=>{
    return (
        <div className="sticky top-5 inset-x-96 flex items-center justify-center h-20 w-40 bg-sky-500 text-gray-200 text-md rounded-tr-xl rounded-bl-xl ">
            <span>Status:{Posted}</span>
        </div>
    )
}

export default Popup;