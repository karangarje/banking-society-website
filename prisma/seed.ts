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

    const branches = [
      {
        id: "headquarters",
        nameEn: "Head Office",
        nameMr: "मुख्यालय",
        addressEn: "S.T. Stand, Nighoj–Parner Road, Nighoj, Tal. Parner, Dist. Ahmednagar",
        addressMr: "एस. टी. स्टँड, निघोज–पारनेर रोड, निघोज, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "(02488) 230449, 230442",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Nighoj+Parner+Ahmednagar",
      },
      {
        id: "alkuti",
        nameEn: "Alkuti",
        nameMr: "अळकुटी",
        addressEn: "Near S. T. Stand, Alkuti, Tal. Parner, Dist. Ahmednagar",
        addressMr: "एस. टी. स्टँड जवळ, अळकुटी, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "(02488) 250092",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Alkuti+Parner",
      },
      {
        id: "supa",
        nameEn: "Supa",
        nameMr: "सुपा",
        addressEn: "Parner-Nagar Road, Near Omkar Hospital, Supa, Tal. Parner, Dist. Ahmednagar",
        addressMr: "पारनेर-नगर रोड, ओंकार हॉस्पिटल जवळ, सुपा, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "(02488) 293092",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Supa+Parner",
      },
      {
        id: "shirur",
        nameEn: "Shirur",
        nameMr: "शिरूर",
        addressEn: "Market Committee Road, behind Mahanagar Bank, Tal. Parner, Dist. Ahmednagar",
        addressMr: "मार्केट कमिटी रोड, महानगर बँकेच्या पाठीमागे, पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "(02488) 222464",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Shirur+Parner",
      },
      {
        id: "shirur-addl",
        nameEn: "Shirur (Additional)",
        nameMr: "शिरूर (अतिरिक्त)",
        addressEn: "Nagar-Pune Road, Wadgaon Rasai, Tal. Parner, Dist. Ahmednagar",
        addressMr: "नगर-पुणे रोड, वाडगाव रासाई, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "9881717236",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Wadgaon+Rasai",
      },
      {
        id: "jawala",
        nameEn: "Jawala",
        nameMr: "जवळा",
        addressEn: "Near S. T. Stand, Tal. Parner, Dist. Ahmednagar",
        addressMr: "एस. टी. स्टँड जवळ, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "(02488) 214091",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Jawala+Parner",
      },
      {
        id: "maltan",
        nameEn: "Maltan",
        nameMr: "मळतण",
        addressEn: "Near Bank of Maharashtra, S. T. Stand, Maltan, Tal. Shirur, Dist. Pune",
        addressMr: "बँक ऑफ महाराष्ट्र शेजारी, एस. टी. स्टँड जवळ, मळतण, ता. शिरूर, जि. पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "(02137) 251799, 9193834775",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Maltan+Shirur",
      },
      {
        id: "taklihaji",
        nameEn: "Taklihaji",
        nameMr: "टाकळीहाजी",
        addressEn: "Near S. T. Stand, Taklihaji, Tal. Shirur, Dist. Pune",
        addressMr: "एस. टी. स्टँड जवळ, टाकळीहाजी, ता. शिरूर, जि. पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "9860398684",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Taklihaji+Shirur",
      },
      {
        id: "koregaon-bhima",
        nameEn: "Koregaon Bhima",
        nameMr: "कोरेगाव भिमा",
        addressEn: "Zonish Commercial Complex, S. No. 52, Near HDFC Bank, Shirur-Pune Rd, Pune",
        addressMr: "झोनिश कमर्शियल कॉम्प्लेक्स, सर्वे नं. ५२, एच.इ.एफ.सी.बँक जवळ, शिरूर-पुणे रोड, कोरेगाव भिमा, ता. शिरूर, जि. पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "9284961105",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Koregaon+Bhima",
      },
      {
        id: "wagholi",
        nameEn: "Wagholi",
        nameMr: "वाघोली",
        addressEn: "Mangalmurti Complex, S. No. 648/1, Shop 8 & 10, Ahmednagar-Pune Rd, Haveli, Pune",
        addressMr: "मंगलमूर्ती कॉम्प्लेक्स, सर्वे नं. ६४८/१, गाळा नं. ८ व १० अहमदनगर-पुणे रोड, वाघोली, ता. हवेली, जि. पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "020-29919338, 9604844029",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Wagholi+Pune",
      },
      {
        id: "alephata",
        nameEn: "Alephata",
        nameMr: "आळेफाटा",
        addressEn: "Near Sangamner Merchant Co-op Bank, Nagar-Kalyan Rd, Junnar, Pune",
        addressMr: "संगमनेर मर्चंट को-ऑप बँक जवळ, नगर-कल्याण रोड, आळेफाटा, ता. जुन्नर, जि. पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "(02132) 263441",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Alephata+Junnar",
      },
      {
        id: "lonimawala",
        nameEn: "Lonimawala",
        nameMr: "लोणीमावळा",
        addressEn: "Lonimawala, Tal. Parner, Dist. Ahmednagar",
        addressMr: "लोणीमावळा, ता. पारनेर, जि. अहमदनगर",
        cityEn: "Ahmednagar",
        cityMr: "अहमदनगर",
        contact: "9604393234",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Lonimawala+Parner",
      },
      {
        id: "chandannagar",
        nameEn: "Chandannagar",
        nameMr: "चंदननगर",
        addressEn: "Chandan Complex, Shivaji Chowk, Chandannagar, Pune",
        addressMr: "चंदन कॉम्प्लेक्स, शिवाजी चौक, चंदननगर, पुणे",
        cityEn: "Pune",
        cityMr: "पुणे",
        contact: "(020) 64058266, 9421059989",
        managerNameEn: "Branch Manager",
        managerNameMr: "शाखा व्यवस्थापक",
        googleMapUrl: "https://maps.google.com/?q=Chandannagar+Pune",
      }
    ];

    for (const b of branches) {
      await prisma.branch.upsert({
        where: { id: b.id },
        update: b,
        create: b,
      });
    }

    console.log("Branches seeded successfully.");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });