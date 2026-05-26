import { User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const adminData: User = {
  name: "admin",
  email: "admin@deacons.com",
  password: bcrypt.hashSync("Admin@12345", 10),
  emailVerified: new Date(),
  image:
    "https://www.pexels.com/photo/photo-of-a-shirtless-handsome-man-against-the-sky-15393590/",
  id: "123456",
};

async function main() {
  console.log("🌱 Start seeding...");

  const { name, email, password, emailVerified, image } = adminData;

  const adminUser = await prisma.user.upsert({
    where: { email: email ?? undefined },
    update: {},
    create: {
      name,
      password,
      email,
      emailVerified,
      image,
    },
  });

  console.log("✅ Admin user created:", adminUser);
  console.log("🌱 Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
