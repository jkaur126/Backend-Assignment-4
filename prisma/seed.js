const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.role.create({
    data: { name: "Admin" }
  });

  const manager = await prisma.role.create({
    data: { name: "Manager" }
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        roleId: admin.id
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        roleId: manager.id
      }
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });