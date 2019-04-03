import CarsOverview from "./../modules/cars/Overview";
import Layout from "./../components/Layout";

const __CARS__ = [
  {
    make: "Volvo",
    model: "C30",
    engine: "T5",
    year: 2018,
    mileage: 123,
    equipment: ["Leather", "Seat heating", "City Safety"]
  },
  {
    make: "Volvo",
    model: "XC60",
    engine: "D5",
    year: 2018,
    mileage: 456,
    equipment: ["Leather", "Seat heating", "City Safety"]
  },
  {
    make: "Volvo",
    model: "XC90",
    engine: "T6",
    year: 2018,
    mileage: 789,
    equipment: ["Leather", "Seat heating", "City Safety"]
  }
];

const CarsPage = () => (
  <Layout>
    {" "}
    <CarsOverview cars={__CARS__} />
  </Layout>
);

export default CarsPage;
