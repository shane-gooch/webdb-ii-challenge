exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "12345678901234567",
          make: "BMW",
          model: "5 series",
          mileage: "90000",
          transmission: "Automatic",
          title: "Savage"
        },
        {
          VIN: "1234567890123447",
          make: "Honda",
          model: "Civic",
          mileage: "90500",
          transmission: "Automatic",
          title: "Savage"
        }
      ]);
    });
};
