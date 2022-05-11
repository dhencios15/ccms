import { faker } from "@faker-js/faker";
import ShortUniqueId from "short-unique-id";
import dayjs from "dayjs";

const uid = new ShortUniqueId();

export const generateDate = () => dayjs(new Date());
export const generateId = () => uid();
export const generatePeopleName = () => faker.name.findName();
export const generatePeopleImage = () => faker.image.people(1234, 2345, true);
export const generateJobTitle = () => faker.name.jobTitle();
