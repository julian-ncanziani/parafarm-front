import { FaWhatsapp } from "react-icons/fa";

const WhatsappBtn = () => {

    const text = 'Hello%20I%20have%20a%20question%20about%20your%20products';
    const tel = '5491170617551';

    return(
        <>
            <a
                href={`https://wa.me/${tel}?text=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-full flex items-center shadow-lg"
                >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                <span className="text-sm">Atencion al Cliente</span> {/* Smaller text */}
            </a>
        </>
    )
}

export default WhatsappBtn;