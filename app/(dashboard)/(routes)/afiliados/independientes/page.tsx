import { auth } from "@clerk/nextjs";
import React from "react";
import TableData from "./table/table";
import getAffiliates from "@/app/actions/getAffiliates";

const AffiliatesPage = async () => {
    const { userId } = auth();
    const affiliates = await getAffiliates();

    return (
        <section className="px-6 py-10">
            <TableData ditems={affiliates} />
        </section>
    );
}

export default AffiliatesPage;
