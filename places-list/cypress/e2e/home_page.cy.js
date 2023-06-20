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
    cy.visit("/");

    // 1. Select create record button
    cy.contains("button.navbtn", "Form").click();

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
  it("should allow for the edit of records", () => {
    cy.visit("/");

    const Record = {
      id: "2",
      place: "Los Angeles",
      description: "Hollywood",
      visited: "Yes",
      rating: "4",
    };

    // 1. Select records to edit
    cy.get("table tbody").within(() => {
      cy.contains("tr", Record.place).within(() => {
        cy.get("#edit.tablebtn").click();
      });
    });

    // 2. Verify that values are selected in form
    cy.get("#popup-form").within(() => {
      cy.get(`input[name="place"][id="input-${Record.place}"]`).should(
        "have.value",
        Record.place
      );
      cy.get(
        `textarea[name="description"][id="textarea-${Record.place}"]`
      ).should("have.value", Record.description);

      cy.get('input[type="radio"]')
        .should("have.value", `${Record.visited}`)
        .should("be.checked");
      cy.get(`input[type="checkbox"][name="${Record.rating}"]`).should(
        "be.checked"
      );
      // 3. Update a single field in record
      cy.get(`textarea[name="description"][id="textarea-${Record.place}"]`)
        .clear()
        .type("Hollywood, Santa Monica, Universal Studios");

      cy.get('input[type="submit"]').click();
    });

    // 4. Verify that update appears in the main record table
    cy.get("table")
      .contains("tr", Record.place)
      .should("contain", "Hollywood, Santa Monica, Universal Studios");
  });

  it("should allow for the deletion of a record", () => {
    cy.visit("/");

    const Record = {
      place: "San Diego",
    };

    cy.get("table tbody").within(() => {
      // 1. Select record to delete
      cy.contains("tr", Record.place).within(() => {
        // 2. Delete record
        cy.get("#delete.tablebtn").click();
      });
    });

    // 3. Verify that record is no longer in table
    cy.get("table tbody").should("not.contain", Record.place);
  });
});
