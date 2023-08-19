import { auth } from "@clerk/nextjs";


const DashboardPage = () => {
    const { userId } = auth();

    console.log("id user logueado");
    console.log(userId);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            
        </section>
    );
}

export default DashboardPage;



