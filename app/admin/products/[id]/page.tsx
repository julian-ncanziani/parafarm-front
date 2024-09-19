import EditProductform from "@/components/editProductPage/EditForm";
import ICustomResponse from "@/interfaces/ICustomResponse";
import IProduct from "@/interfaces/IProduct";


const getProduct = async(id: string): Promise<ICustomResponse<IProduct>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/product?id=${id}`, {cache: "no-store"});
    const response = await res.json();
    return response;
};

const ProductPage = async ({params}: {params: {id: string}}) => {
    const { id } = params;
    const { data , error, message} = await getProduct(id);

    return(
        <div className="h-screen max-h-screen overflow-auto p-6 w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full">
                <EditProductform product={data} />
            </div>
        </div>
    )
}

export default ProductPage;