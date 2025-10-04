import { EventTopic, PrismaClient, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.warn("Start seeding...");

  // Drop all data
  await prisma.submission.deleteMany();
  await prisma.task.deleteMany();
  await prisma.volunteer.deleteMany();
  await prisma.coordinator.deleteMany();
  await prisma.school.deleteMany();
  await prisma.event.deleteMany();
  await prisma.organization.deleteMany();

  // Organizations
  const orgKraz = await prisma.organization.upsert({
    where: { id: "org-krakow-razem" },
    update: {
      name: "Fundacja Kraków Razem",
      description: "Wsparcie lokalnych inicjatyw społecznych w Krakowie",
    },
    create: {
      id: "org-krakow-razem",
      name: "Fundacja Kraków Razem",
      description: "Wsparcie lokalnych inicjatyw społecznych w Krakowie",
    },
  });

  const orgHackyeah = await prisma.organization.upsert({
    where: { id: "org-hackyeah" },
    update: {
      name: "HackYeah Foundation",
      description: "Wsparcie dla hackathonów i projektów technologicznych",
    },
    create: {
      id: "org-hackyeah",
      name: "HackYeah Foundation",
      description: "Wsparcie dla hackathonów i projektów technologicznych",
    },
  });

  const orgEco = await prisma.organization.upsert({
    where: { id: "org-eko-krakow" },
    update: {
      name: "EcoKraków",
      description: "Inicjatywy ekologiczne w regionie",
    },
    create: {
      id: "org-eko-krakow",
      name: "EcoKraków",
      description: "Inicjatywy ekologiczne w regionie",
    },
  });

  const orgCity = await prisma.organization.upsert({
    where: { id: "org-miasto-krakow" },
    update: {
      name: "Miasto Kraków",
      description: "Wydarzenia miejskie i wsparcie",
    },
    create: {
      id: "org-miasto-krakow",
      name: "Miasto Kraków",
      description: "Wydarzenia miejskie i wsparcie",
    },
  });

  // Events - dużo eventów do demo
  const eventsData = [
    {
      id: "event-hackyeah-orientation",
      title: "HackYeah – Sesja orientacyjna",
      topic: EventTopic.TECH,
      description: "Wprowadzenie do HackYeah, zasady i harmonogram.",
      startDate: new Date("2025-10-10T09:00:00.000Z"),
      endDate: new Date("2025-10-10T11:00:00.000Z"),
      longitude: 19.941,
      latitude: 50.064,
      organizationId: orgHackyeah.id,
    },
    {
      id: "event-ai-for-good",
      title: "Hackathon: AI for Good",
      topic: EventTopic.TECH,
      description: "Drużyny pracują nad rozwiązaniami AI dla NGO.",
      startDate: new Date("2025-10-11T09:00:00.000Z"),
      endDate: new Date("2025-10-12T20:00:00.000Z"),
      longitude: 19.942,
      latitude: 50.065,
      organizationId: orgHackyeah.id,
    },
    {
      id: "event-park-planty-tree",
      title: "Sadzimy drzewa na Plantach",
      topic: EventTopic.ENVIRONMENT,
      description: "Akcja sadzenia drzew i krzewów na Plantach Krakowskich.",
      startDate: new Date("2025-09-20T09:00:00.000Z"),
      endDate: new Date("2025-09-20T13:00:00.000Z"),
      longitude: 19.9415,
      latitude: 50.0648,
      organizationId: orgEco.id,
    },
    {
      id: "event-wisla-cleanup",
      title: "Sprzątanie Wisły",
      topic: EventTopic.ENVIRONMENT,
      description: "Czysta Wisła – zbiórka śmieci nad brzegiem rzeki.",
      startDate: new Date("2025-09-27T08:00:00.000Z"),
      endDate: new Date("2025-09-27T12:00:00.000Z"),
      longitude: 19.937,
      latitude: 50.059,
      organizationId: orgEco.id,
    },
    {
      id: "event-food-drive-krakow",
      title: "Zbiórka żywności – Kraków",
      topic: EventTopic.COMMUNITY,
      description: "Zbiórka i sortowanie żywności dla potrzebujących.",
      startDate: new Date("2025-11-05T10:00:00.000Z"),
      endDate: new Date("2025-11-05T15:00:00.000Z"),
      longitude: 19.934,
      latitude: 50.061,
      organizationId: orgKraz.id,
    },
    {
      id: "event-senior-workshop",
      title: "Warsztaty dla seniorów: cyfrowa codzienność",
      topic: EventTopic.EDUCATION,
      description: "Pomoc w obsłudze smartfonów i Internetu dla seniorów.",
      startDate: new Date("2025-10-05T10:00:00.000Z"),
      endDate: new Date("2025-10-05T13:00:00.000Z"),
      longitude: 19.95,
      latitude: 50.062,
      organizationId: orgCity.id,
    },
    {
      id: "event-youth-coding",
      title: "Młodzieżowy kurs programowania",
      topic: EventTopic.EDUCATION,
      description: "Weekendowy kurs wprowadzający do web dev dla licealistów.",
      startDate: new Date("2025-10-18T09:00:00.000Z"),
      endDate: new Date("2025-10-19T16:00:00.000Z"),
      longitude: 19.944,
      latitude: 50.064,
      organizationId: orgHackyeah.id,
    },
    {
      id: "event-recycling-workshop",
      title: "Warsztat: recykling i naprawa",
      topic: EventTopic.EDUCATION,
      description: "Jak naprawiać rzeczy zamiast wyrzucać.",
      startDate: new Date("2025-09-30T11:00:00.000Z"),
      endDate: new Date("2025-09-30T14:00:00.000Z"),
      longitude: 19.939,
      latitude: 50.063,
      organizationId: orgKraz.id,
    },
    {
      id: "event-community-concert",
      title: "Koncert sąsiedzki – Mały Rynek",
      topic: EventTopic.COMMUNITY,
      description: "Muzyka lokalnych zespołów, zbiórka na cele charytatywne.",
      startDate: new Date("2025-10-25T17:00:00.000Z"),
      endDate: new Date("2025-10-25T21:00:00.000Z"),
      longitude: 19.9347,
      latitude: 50.0635,
      organizationId: orgKraz.id,
    },
    {
      id: "event-tech-meetup-krakow",
      title: "Kraków Tech Meetup",
      topic: EventTopic.TECH,
      description: "Prezentacje startupów i networkingu podczas HackYeah.",
      startDate: new Date("2025-10-12T18:00:00.000Z"),
      endDate: new Date("2025-10-12T21:00:00.000Z"),
      longitude: 19.945,
      latitude: 50.066,
      organizationId: orgHackyeah.id,
    },
  ];

  const events: Record<
    string,
    Awaited<ReturnType<typeof prisma.event.upsert>>
  > = {};
  for (const event of eventsData) {
    const created = await prisma.event.upsert({
      where: { id: event.id },
      update: {
        title: event.title,
        topic: event.topic,
        description: event.description,
      },
      create: {
        id: event.id,
        title: event.title,
        topic: event.topic,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        longitude: event.longitude,
        latitude: event.latitude,
        organizationId: event.organizationId,
      },
    });
    events[event.id] = created;
  }

  // Schools
  const school1 = await prisma.school.upsert({
    where: { id: "school-1" },
    update: { name: "V Liceum Ogólnokształcące im. Mikołaja Kopernika" },
    create: {
      id: "school-1",
      name: "V Liceum Ogólnokształcące im. Mikołaja Kopernika",
    },
  });

  const school2 = await prisma.school.upsert({
    where: { id: "school-2" },
    update: { name: "II Liceum Ogólnokształcące im. Króla Jana III" },
    create: {
      id: "school-2",
      name: "II Liceum Ogólnokształcące im. Króla Jana III",
    },
  });

  const school3 = await prisma.school.upsert({
    where: { id: "school-3" },
    update: { name: "Zespół Szkół Technicznych Kraków" },
    create: { id: "school-3", name: "Zespół Szkół Technicznych Kraków" },
  });

  // Coordinators
  await prisma.coordinator.upsert({
    where: { id: "coord-anna" },
    update: {
      name: "Anna Nowak",
      email: "anna.nowak@szkola.edu.pl",
      schoolId: school1.id,
    },
    create: {
      id: "coord-anna",
      name: "Anna Nowak",
      email: "anna.nowak@szkola.edu.pl",
      schoolId: school1.id,
    },
  });

  await prisma.coordinator.upsert({
    where: { id: "coord-piotr" },
    update: {
      name: "Piotr Malinowski",
      email: "piotr.malinowski@szkola.edu.pl",
      schoolId: school2.id,
    },
    create: {
      id: "coord-piotr",
      name: "Piotr Malinowski",
      email: "piotr.malinowski@szkola.edu.pl",
      schoolId: school2.id,
    },
  });

  await prisma.coordinator.upsert({
    where: { id: "coord-marta" },
    update: {
      name: "Marta Kowalczyk",
      email: "marta.kowalczyk@technik.edu.pl",
      schoolId: school3.id,
    },
    create: {
      id: "coord-marta",
      name: "Marta Kowalczyk",
      email: "marta.kowalczyk@technik.edu.pl",
      schoolId: school3.id,
    },
  });

  // Volunteers - sporo wolontariuszy do demo
  const volunteersData = [
    {
      id: "vol-ania",
      name: "Agnieszka Bielecka",
      email: "agnieszka.b@example.com",
      birthdate: "2004-03-12",
      schoolId: school1.id,
    },
    {
      id: "vol-kuba",
      name: "Jakub Zieliński",
      email: "jakub.z@example.com",
      birthdate: "2003-07-21",
      schoolId: school2.id,
    },
    {
      id: "vol-ola",
      name: "Olga Wójcik",
      email: "olga.w@example.com",
      birthdate: "2005-01-05",
      schoolId: school1.id,
    },
    {
      id: "vol-marek",
      name: "Marek Szymański",
      email: "marek.s@example.com",
      birthdate: "2002-11-11",
      schoolId: school3.id,
    },
    {
      id: "vol-ewa",
      name: "Ewa Kowalska",
      email: "ewa.k@example.com",
      birthdate: "2004-06-30",
      schoolId: school2.id,
    },
    {
      id: "vol-tomek",
      name: "Tomasz Kamiński",
      email: "tomasz.k@example.com",
      birthdate: "2001-02-18",
      schoolId: school3.id,
    },
    {
      id: "vol-paulina",
      name: "Paulina Nowicka",
      email: "paulina.n@example.com",
      birthdate: "2005-08-09",
      schoolId: school1.id,
    },
    {
      id: "vol-przemek",
      name: "Przemysław Górski",
      email: "przemek.g@example.com",
      birthdate: "2003-12-02",
      schoolId: school2.id,
    },
  ];

  const volunteers: Record<
    string,
    Awaited<ReturnType<typeof prisma.volunteer.upsert>>
  > = {};
  for (const v of volunteersData) {
    const created = await prisma.volunteer.upsert({
      where: { email: v.email },
      update: {
        name: v.name,
        birthdate: new Date(v.birthdate),
        schoolId: v.schoolId,
      },
      create: {
        id: v.id,
        name: v.name,
        email: v.email,
        birthdate: new Date(v.birthdate),
        schoolId: v.schoolId,
      },
    });
    volunteers[v.id] = created;
  }

  // Submissions - różne statusy dla demo
  const submissionsData = [
    {
      id: "sub-1",
      vol: "vol-ania",
      event: "event-park-planty-tree",
      status: SubmissionStatus.APPROVED,
    },
    {
      id: "sub-2",
      vol: "vol-kuba",
      event: "event-ai-for-good",
      status: SubmissionStatus.APPROVED,
    },
    {
      id: "sub-3",
      vol: "vol-ola",
      event: "event-youth-coding",
      status: SubmissionStatus.PENDING,
    },
    {
      id: "sub-4",
      vol: "vol-marek",
      event: "event-wisla-cleanup",
      status: SubmissionStatus.APPROVED,
    },
    {
      id: "sub-5",
      vol: "vol-ewa",
      event: "event-food-drive-krakow",
      status: SubmissionStatus.PENDING,
    },
    {
      id: "sub-6",
      vol: "vol-tomek",
      event: "event-hackyeah-orientation",
      status: SubmissionStatus.APPROVED,
    },
    {
      id: "sub-7",
      vol: "vol-paulina",
      event: "event-recycling-workshop",
      status: SubmissionStatus.PENDING,
    },
    {
      id: "sub-8",
      vol: "vol-przemek",
      event: "event-tech-meetup-krakow",
      status: SubmissionStatus.REJECTED,
    },

    // Dodatkowe zgłoszenia dla vol-ania, razem 4 różne statusy (łącznie z sub-1)
    {
      id: "sub-9",
      vol: "vol-ania",
      event: "event-recycling-workshop",
      status: SubmissionStatus.PENDING,
    },
    {
      id: "sub-10",
      vol: "vol-ania",
      event: "event-tech-meetup-krakow",
      status: SubmissionStatus.APPROVED,
    },
    {
      id: "sub-11",
      vol: "vol-ania",
      event: "event-hackyeah-orientation",
      status: SubmissionStatus.REJECTED,
    },
  ];

  for (const s of submissionsData) {
    await prisma.submission.upsert({
      where: {
        volunteerId_eventId: {
          volunteerId: volunteers[s.vol].id,
          eventId: events[s.event].id,
        },
      },
      update: { status: s.status },
      create: {
        id: s.id,
        volunteerId: volunteers[s.vol].id,
        eventId: events[s.event].id,
        status: s.status,
      },
    });
  }

  // Tasks - przypisane do eventów i wolontariuszy
  const tasksData = [
    {
      id: "task-planty-1",
      title: "Sadzonki i narzędzia",
      description: "Rozdawanie sadzonek i narzędzi ochotnikom",
      startDate: new Date("2025-09-20T09:00:00.000Z"),
      endDate: new Date("2025-09-20T12:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-park-planty-tree"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-wisla-1",
      title: "Zbieranie odpadów",
      description: "Zbieranie plastików i metali przy brzegu",
      startDate: new Date("2025-09-27T08:00:00.000Z"),
      endDate: new Date("2025-09-27T11:30:00.000Z"),
      isCompleted: false,
      eventId: events["event-wisla-cleanup"].id,
      volunteerId: volunteers["vol-marek"].id,
    },
    {
      id: "task-ai-1",
      title: "Mentoring zespołów AI",
      description: "Wsparcie mentoringowe dla zespołów podczas hackathonu",
      startDate: new Date("2025-10-11T10:00:00.000Z"),
      endDate: new Date("2025-10-12T18:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-kuba"].id,
    },
    {
      id: "task-food-1",
      title: "Sortowanie żywności",
      description: "Sprawdzanie dat ważności i pakowanie paczek",
      startDate: new Date("2025-11-05T10:00:00.000Z"),
      endDate: new Date("2025-11-05T14:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-food-drive-krakow"].id,
      volunteerId: volunteers["vol-ewa"].id,
    },
    {
      id: "task-hackyeah-setup",
      title: "Przygotowanie sali HackYeah",
      description: "Ustawianie miejsc, tablic i technicznej infrastruktury",
      startDate: new Date("2025-10-10T14:00:00.000Z"),
      endDate: new Date("2025-10-11T08:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-hackyeah-orientation"].id,
      volunteerId: volunteers["vol-tomek"].id,
    },

    // Dodatkowe zadania związane z HackYeah / demo (~15)
    {
      id: "task-hack-mentor-1",
      title: "Mentoring – AI Zespół A",
      description: "Pomoc merytoryczna przy modelu",
      startDate: new Date("2025-10-11T11:00:00.000Z"),
      endDate: new Date("2025-10-11T16:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-mentor-2",
      title: "Mentoring – AI Zespół B",
      description: "Wsparcie przy przygotowaniu prezentacji",
      startDate: new Date("2025-10-11T12:00:00.000Z"),
      endDate: new Date("2025-10-11T18:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-mentor-3",
      title: "Mentoring – dane i ETL",
      description: "Przygotowanie zbiorów i skryptów",
      startDate: new Date("2025-10-11T13:00:00.000Z"),
      endDate: new Date("2025-10-12T12:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-logistics-1",
      title: "Logistyka – stoły i przedłużacze",
      description: "Rozmieszczenie stolików i oznaczeń",
      startDate: new Date("2025-10-10T15:00:00.000Z"),
      endDate: new Date("2025-10-11T09:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-reception",
      title: "Rejestracja uczestników",
      description: "Check-in i wydawanie identyfikatorów",
      startDate: new Date("2025-10-11T08:00:00.000Z"),
      endDate: new Date("2025-10-11T12:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-hackyeah-orientation"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-sponsors",
      title: "Obsługa partnerów i sponsorów",
      description: "Punkty kontaktowe dla sponsorów podczas meetupu",
      startDate: new Date("2025-10-12T17:00:00.000Z"),
      endDate: new Date("2025-10-12T21:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-tech-meetup-krakow"].id,
      volunteerId: volunteers["vol-ania"].id,
    },
    {
      id: "task-hack-sound",
      title: "Aparatura i nagłośnienie",
      description: "Ustawienie systemu audio dla prezentacji",
      startDate: new Date("2025-10-12T15:00:00.000Z"),
      endDate: new Date("2025-10-12T18:30:00.000Z"),
      isCompleted: false,
      eventId: events["event-tech-meetup-krakow"].id,
      volunteerId: volunteers["vol-tomek"].id,
    },
    {
      id: "task-youth-instructors-1",
      title: "Instruktor – frontend",
      description: "Prowadzenie zajęć z HTML/CSS/JS",
      startDate: new Date("2025-10-18T09:00:00.000Z"),
      endDate: new Date("2025-10-18T14:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-youth-coding"].id,
      volunteerId: volunteers["vol-ola"].id,
    },
    {
      id: "task-youth-instructors-2",
      title: "Instruktor – backend",
      description: "Warsztat z node/express",
      startDate: new Date("2025-10-19T09:00:00.000Z"),
      endDate: new Date("2025-10-19T16:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-youth-coding"].id,
      volunteerId: volunteers["vol-paulina"].id,
    },
    {
      id: "task-recycle-setup",
      title: "Stacje naprawcze",
      description: "Przygotowanie stanowisk do napraw",
      startDate: new Date("2025-09-30T09:30:00.000Z"),
      endDate: new Date("2025-09-30T11:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-recycling-workshop"].id,
      volunteerId: volunteers["vol-paulina"].id,
    },
    {
      id: "task-community-logistics",
      title: "Logistyka koncertu",
      description: "Oznakowanie, backstage, obszar publiczności",
      startDate: new Date("2025-10-25T15:00:00.000Z"),
      endDate: new Date("2025-10-25T22:30:00.000Z"),
      isCompleted: false,
      eventId: events["event-community-concert"].id,
      volunteerId: volunteers["vol-przemek"].id,
    },
    {
      id: "task-community-security",
      title: "Koordynacja bezpieczeństwa",
      description: "Kontakt ze służbami i koordynacja ochrony",
      startDate: new Date("2025-10-25T16:00:00.000Z"),
      endDate: new Date("2025-10-25T22:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-community-concert"].id,
      volunteerId: volunteers["vol-marek"].id,
    },
    {
      id: "task-senior-setup",
      title: "Przygotowanie sali dla seniorów",
      description: "Stoły, krzesła, pomoce dydaktyczne",
      startDate: new Date("2025-10-05T09:00:00.000Z"),
      endDate: new Date("2025-10-05T10:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-senior-workshop"].id,
      volunteerId: volunteers["vol-ewa"].id,
    },
    {
      id: "task-senior-help-desk",
      title: "Punkt pomocy dla seniorów",
      description: "Pomoc w obsłudze smartfonów i aplikacji",
      startDate: new Date("2025-10-05T10:00:00.000Z"),
      endDate: new Date("2025-10-05T13:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-senior-workshop"].id,
      volunteerId: volunteers["vol-kuba"].id,
    },
    {
      id: "task-ai-data-prep",
      title: "Przygotowanie zestawów danych",
      description: "Anotacja i walidacja danych treningowych",
      startDate: new Date("2025-10-11T09:00:00.000Z"),
      endDate: new Date("2025-10-11T13:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-kuba"].id,
    },
    {
      id: "task-ai-devops",
      title: "CI/CD i środowiska",
      description: "Utrzymanie serwerów i pipeline'ów demo",
      startDate: new Date("2025-10-11T12:00:00.000Z"),
      endDate: new Date("2025-10-12T20:00:00.000Z"),
      isCompleted: false,
      eventId: events["event-ai-for-good"].id,
      volunteerId: volunteers["vol-przemek"].id,
    },
  ];

  for (const t of tasksData) {
    await prisma.task.upsert({
      where: { id: t.id },
      update: {
        title: t.title,
        isCompleted: t.isCompleted,
        volunteerId: t.volunteerId,
      },
      create: {
        id: t.id,
        title: t.title,
        description: t.description,
        startDate: t.startDate,
        endDate: t.endDate,
        isCompleted: t.isCompleted,
        eventId: t.eventId,
        volunteerId: t.volunteerId,
      },
    });
  }

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
