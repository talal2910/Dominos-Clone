export type Store = {
  id: string;
  title: string;
  address: string;
  city: string;
  status: "Open" | "Closed";
};

export const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
];

export const stores: Store[] = [
  {
    id: "1",
    title: "GULSHAN-E-RAVI",
    address:
      "2, C Block c block Gulshan-e-Ravi, Lahore, Punjab 54500, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "2",
    title: "EME DHA",
    address:
      "346 Majid Ave, Commercial Block J DHA EME Sector, XII, Lahore, Lahore, Punjab 54810, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "3",
    title: "CAVALRY",
    address:
      "97 Street 17, Extension Cavalry Ground, Lahore, Punjab 54008, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "4",
    title: "DHA PHASE 1 H BLOCK",
    address: "43 Street 60, Sector E Dha Phase 1, Lahore, Punjab, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "5",
    title: "DHA PHASE 5",
    address: "FC78+37V, Sector C Phase 5 D.H.A, Lahore, Punjab, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "6",
    title: "DHA PHASE-8 LHR",
    address:
      "FCV8+M8Q, Street 11, Gulshan Ali Colony Gulshan e Ali Colony, Lahore, Punjab, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "7",
    title: "SHADMAN",
    address: "Plot 155, Shadman 1 Shadman, Lahore, Punjab 54000, Pakistan",
    city: "Lahore",
    status: "Open",
  },
  {
    id: "8",
    title: "MALL ROAD",
    address:
      "Behind Dayal Singh Mansion,, The Mall Road, Mozang Chungi, Lahore, Punjab 54000, Pakistan",
    city: "Lahore",
    status: "Open",
  },
];
