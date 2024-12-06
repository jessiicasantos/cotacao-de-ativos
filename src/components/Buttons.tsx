export const ButtonGreen = ({ children, className, type }: any) => {
    return (
        <button type={type} className={`${className} bg-[#37776C] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded`}>
            {children}
        </button>
    )
}

export const ButtonBorder = ({ children, className, type }: any) => {
    return (
        <button type={type} className={`${className} bg-white text-gray-600 shadow-[0_0_2px_rgba(0,0,0,0.5)] hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded`}>
            {children}
        </button>
    )
}