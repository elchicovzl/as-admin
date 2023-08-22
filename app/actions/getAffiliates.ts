import prisma from "@/libs/prismadb";

export default async function getAffiliates() {
    try {
        
        const xprisma = prisma.$extends({
            result: {
                affiliate: {
                    fullName: {
                        // the dependencies
                        needs: { names: true, lastNames: true },
                        compute(user) {
                            // the computation logic
                            return `${user.names} ${user.lastNames}`
                        },
                    },
                },
            },
        });

        const affiliates = await xprisma.affiliate.findMany({
            include: {
                contributorType: {
                    select: {
                        name:true,
                        description:true,
                        durationProccess:true,
                        price:true
                    }
                },
                address: {
                    select: {
                        address:true,
                        neighborhood:true,
                        municipality:true,
                        department:true,
                    }
                },
                phones: {
                    select: {
                        type:true,
                        number: true
                    },
                }
            },
            orderBy: {
              createdAt: 'desc'
            }
        });

        const safeAffiliates = affiliates.map((affiliate) => ({
        ...affiliate,
        createdAt:     affiliate.createdAt.toISOString(),
        updatedAt:     affiliate.updatedAt.toISOString(),
        dateBirth:     affiliate.dateBirth.toISOString(),
        dateAdmission: affiliate.dateAdmission.toISOString(),
        }));

        return safeAffiliates;

    } catch (error: any) {
        return null
    }
}