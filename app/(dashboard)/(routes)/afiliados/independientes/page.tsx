import { auth } from "@clerk/nextjs";


const AffiliatesPage = () => {
    const { userId } = auth();


    return (
        <section className="flex flex-col justify-center mx-5 gap-4 py-8 md:py-10">
            <h1>Afiliados</h1>
        </section>
    );
}

export default AffiliatesPage;
