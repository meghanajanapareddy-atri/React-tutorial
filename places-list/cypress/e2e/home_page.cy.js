describe("My Travel List", () => {
  it("should show me a list of records", () => {
    cy.visit("/");

    // 1. Verify that number of rows are expected
    cy.get(".table").find("tr").should("have.length", 3);

    // 2. Verify that headers in table are present
    const expectedHeaders = ["ID", "Name", "Description", "Visited", "Rating"];

    cy.get("table")
      .find("th")
      .each(($header, index) => {
        cy.wrap($header).should("contain.text", expectedHeaders[index]);
      });
  });

  it("should allow for the creation of records", () => {
    cy.visit("/formpage");

    // 1. Select create record button
    cy.get("form").find('input[type="submit"]').click();

    // 2. Fill out create record form
    cy.get('input[name="place"]').type("Seattle");

    cy.get('textarea[name="description"]').type("Mt.Rainier");

    cy.get('input[type="radio"][name="visited"][value="Yes"]').check();

    cy.get('input[type="checkbox"][name="5"]').check();

    cy.get("form").submit();

    cy.contains("button.navbtn", "Home").click();

    // 3. Verify that new record is in table
    const newRecord = {
      place: "Seattle",
      description: "Mt.Rainier",
      visited: "Yes",
      rating: "5",
    };

    cy.get("table")
      .contains("tr", newRecord.place)
      .should("contain", newRecord.description)
      .should("contain", newRecord.visited)
      .should("contain", newRecord.rating);
  });
});
