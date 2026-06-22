import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("root", 10);

    await prisma.employee.upsert({
        where: { username: "manager" },
        update: {
            email: "manager@babasahebkavad.com",
            name: "Bank Manager",
            password,
            role: "MANAGER",
            status: "ACTIVE",
            isLocked: false,
            failedAttempts: 0,
            lockUntil: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        create: {
            username: "manager",
            email: "manager@babasahebkavad.com",
            name: "Bank Manager",
            password,
            role: "MANAGER",
            status: "ACTIVE",
            isLocked: false,
            failedAttempts: 0,
        },
    });

    await prisma.employee.upsert({
        where: { username: "employee" },
        update: {
            email: "employee@babasahebkavad.com",
            name: "Bank Employee",
            password,
            role: "EMPLOYEE",
            status: "ACTIVE",
            isLocked: false,
            failedAttempts: 0,
            lockUntil: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        create: {
            username: "employee",
            email: "employee@babasahebkavad.com",
            name: "Bank Employee",
            password,
            role: "EMPLOYEE",
            status: "ACTIVE",
            isLocked: false,
            failedAttempts: 0,
        },
    });

    console.log("Manager and Employee logins created:");
    console.log("Username: manager / employee");
    console.log("Password: root");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });