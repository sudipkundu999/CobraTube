import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Fiction",
    description:
      "Literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Poetry",
    description: "Books that contain curated collection of poetry by an author",
  },
  {
    _id: uuid(),
    categoryName: "Educational",
    description: "Books that contain information about a particular subject",
  },
  {
    _id: uuid(),
    categoryName: "Life Changing",
    description: "Reading these books have a big impact on life",
  },
];
