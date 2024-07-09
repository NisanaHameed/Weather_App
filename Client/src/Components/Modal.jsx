import React from 'react'

const Modal = ({ favorites, setShowFavorites, setCity }) => {

    const clickCity = (city) => {
        setCity(city);
        setShowFavorites(false);
    }

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className=" bg-gray-950 bg-opacity-60 my-auto fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded shadow mb-5">
                    <button
                        onClick={() => setShowFavorites(false)}
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-[#4887c3] rounded text-sm w-6 h-6 ms-auto inline-flex justify-center items-center "
                        data-modal-hide="popup-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="text-center mt-10">
                        <h2 className="font-medium py-2 rounded-t bg-[#22486d] text-gray-400">{favorites.length ? 'Favorites' : 'No Favorites'}</h2>
                        <ul className="p-4 md:p-5 space-y-3 overflow-y-auto max-h-52 bg-[#396590]">
                            {favorites.map((val, ind) =>
                            (
                                <li key={ind} onClick={() => clickCity(val.city)}>
                                    <a className="flex items-center p-1 y-2 font-medium text-sm text-gray-900 rounded-lg hover:bg-[#4887c3] group hover:shadow">
                                        <span className="flex-1 ms-3 whitespace-nowrap">{val.city}</span>
                                    </a>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
