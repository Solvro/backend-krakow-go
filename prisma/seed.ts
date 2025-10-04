/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventTopic, PrismaClient, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.warn("Start seeding...");

  // Organizations
  const org1 = await prisma.organization.upsert({
    where: { id: "org-1" },
    update: {
      name: "Helping Hands",
      description: "Local charity organization",
    },
    create: {
      id: "org-1",
      name: "Helping Hands",
      description: "Local charity organization",
    },
  });

  const org2 = await prisma.organization.upsert({
    where: { id: "org-2" },
    update: { name: "Green Future", description: "Environmental NGO" },
    create: {
      id: "org-2",
      name: "Green Future",
      description: "Environmental NGO",
    },
  });

  // Events
  const event1 = await prisma.event.upsert({
    where: { id: "event-1" },
    update: {
      title: "Park Cleanup",
      topic: EventTopic.ENVIRONMENT,
      description: "Cleaning the central park",
    },
    create: {
      id: "event-1",
      title: "Park Cleanup",
      topic: EventTopic.ENVIRONMENT,
      description: "Cleaning the central park",
      startDate: new Date("2025-10-15T09:00:00.000Z"),
      endDate: new Date("2025-10-15T13:00:00.000Z"),
      longitude: 19.945,
      latitude: 50.0647,
      organizationId: org2.id,
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: "event-2" },
    update: {
      title: "Food Drive",
      topic: EventTopic.COMMUNITY,
      description: "Collecting food for the needy",
    },
    create: {
      id: "event-2",
      title: "Food Drive",
      topic: EventTopic.COMMUNITY,
      description: "Collecting food for the needy",
      startDate: new Date("2025-11-01T10:00:00.000Z"),
      endDate: new Date("2025-11-01T15:00:00.000Z"),
      longitude: 19.9348,
      latitude: 50.0619,
      organizationId: org1.id,
    },
  });

  // Schools
  const school1 = await prisma.school.upsert({
    where: { id: "school-1" },
    update: { name: "Krakow High School" },
    create: { id: "school-1", name: "Krakow High School" },
  });

  const school2 = await prisma.school.upsert({
    where: { id: "school-2" },
    update: { name: "Wawel Secondary" },
    create: { id: "school-2", name: "Wawel Secondary" },
  });

  // Coordinators
  await prisma.coordinator.upsert({
    where: { id: "coord-1" },
    update: {
      name: "Anna Kowalska",
      email: "anna.kowalska@example.com",
      schoolId: school1.id,
    },
    create: {
      id: "coord-1",
      name: "Anna Kowalska",
      email: "anna.kowalska@example.com",
      schoolId: school1.id,
    },
  });

  await prisma.coordinator.upsert({
    where: { id: "coord-2" },
    update: {
      name: "Piotr Nowak",
      email: "piotr.nowak@example.com",
      schoolId: school2.id,
    },
    create: {
      id: "coord-2",
      name: "Piotr Nowak",
      email: "piotr.nowak@example.com",
      schoolId: school2.id,
    },
  });

  // Volunteers
  const vol1 = await prisma.volunteer.upsert({
    where: { email: "julia.wisniewska@example.com" },
    update: {
      name: "Julia Wisniewska",
      birthdate: new Date("2005-05-20"),
      schoolId: school1.id,
    },
    create: {
      name: "Julia Wisniewska",
      email: "julia.wisniewska@example.com",
      birthdate: new Date("2005-05-20"),
      schoolId: school1.id,
      id: "vol-1",
    },
  });

  const vol2 = await prisma.volunteer.upsert({
    where: { email: "marek.zielinski@example.com" },
    update: {
      name: "Marek Zielinski",
      birthdate: new Date("2003-09-10"),
      schoolId: school2.id,
    },
    create: {
      name: "Marek Zielinski",
      email: "marek.zielinski@example.com",
      birthdate: new Date("2003-09-10"),
      schoolId: school2.id,
      id: "vol-2",
    },
  });

  // Submissions (volunteer registrations to events)
  await prisma.submission.upsert({
    where: {
      volunteerId_eventId: { volunteerId: vol1.id, eventId: event1.id },
    },
    update: { status: SubmissionStatus.APPROVED },
    create: {
      volunteerId: vol1.id,
      eventId: event1.id,
      status: SubmissionStatus.APPROVED,
      id: "sub-1",
    },
  });

  await prisma.submission.upsert({
    where: {
      volunteerId_eventId: { volunteerId: vol2.id, eventId: event2.id },
    },
    update: { status: SubmissionStatus.PENDING },
    create: {
      volunteerId: vol2.id,
      eventId: event2.id,
      status: SubmissionStatus.PENDING,
      id: "sub-2",
    },
  });

  // Tasks
  await prisma.task.upsert({
    where: { id: "task-1" },
    update: {
      title: "Collect trash",
      isCompleted: false,
      volunteerId: vol1.id,
    },
    create: {
      id: "task-1",
      title: "Collect trash",
      description: "Bring gloves and bags",
      startDate: new Date("2025-10-15T09:00:00.000Z"),
      endDate: new Date("2025-10-15T12:00:00.000Z"),
      isCompleted: false,
      eventId: event1.id,
      volunteerId: vol1.id,
    },
  });

  await prisma.task.upsert({
    where: { id: "task-2" },
    update: {
      title: "Sort donations",
      isCompleted: false,
      volunteerId: vol2.id,
    },
    create: {
      id: "task-2",
      title: "Sort donations",
      description: "Sort food by type and expiry",
      startDate: new Date("2025-11-01T10:00:00.000Z"),
      endDate: new Date("2025-11-01T14:00:00.000Z"),
      isCompleted: false,
      eventId: event2.id,
      volunteerId: vol2.id,
    },
  });

  console.warn("Seeding finished.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
