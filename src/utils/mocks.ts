import { Movie } from "./film";

export const MOVIES: Movie[] = [
  {
    _id: "1a2b3c4d5e",
    poster: "./src/assets/harry_potter.jpg",
    title: "The Great Adventure",
    synopsis:
      "A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.A group of friends embark on a journey across the world to find a hidden treasure.",
    director: "John Doe",
    mainCharacters: ["Alice", "Bob", "Charlie"],
    rating: 8.5,
    votes: 1245,
    comments: [
      {
        user: "movieLover42",
        message:
          "Absolutely loved this movie! Great plot and fantastic acting.",
        rating: 9,
        createdAt: "2024-09-01T14:35:00Z",
      },
      {
        user: "filmCritic99",
        message: "A fun adventure but the pacing felt off in some parts.",
        rating: 7,
        createdAt: "2024-09-03T10:15:00Z",
      },
    ],
  },
  {
    _id: "6f7g8h9i0j",
    poster: "./src/assets/les_evades.jpg",
    title: "The Mystery of the Old Mansion",
    synopsis:
      "A detective is called to solve a murder mystery in an old mansion full of secrets.",
    director: "Jane Smith",
    mainCharacters: ["Detective Holmes", "Mrs. Green", "Mr. Brown"],
    rating: 9.1,
    votes: 2378,
    comments: [
      {
        user: "mysteryFan",
        message: "One of the best mystery films I've seen in years!",
        rating: 10,
        createdAt: "2024-08-15T09:00:00Z",
      },
      {
        user: "oldSchool",
        message: "Reminds me of classic detective stories. A true masterpiece.",
        rating: 9,
        createdAt: "2024-08-20T16:45:00Z",
      },
    ],
  },
];
