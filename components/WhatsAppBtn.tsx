import { FaWhatsapp } from "react-icons/fa";

const WhatsappBtn = () => {

    const text = 'Hello%20I%20have%20a%20question%20about%20your%20products';
    const tel = '5491154186728';

    return(
        <>
            <a
                href={`https://wa.me/${tel}?text=${text}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                Contact Us on WhatsApp
            </a>
        </>
    )
}

export default WhatsappBtn;