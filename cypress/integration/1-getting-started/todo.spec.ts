import { createMachine } from "xstate";
import { createModel } from "@xstate/test";
import { addTestsToMachine, dedupPathPlans } from "../../../src/utils";

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgHl8ACbAe1TEoAd0YBiAYQBtdMBrSqAFdcEOIlCMasXABdcNfOJAAPRAEYA7AGYSATl0BWLfoAsGgwAZdGgGxaANCACeiALSaTJNTZMGATFoAHGaaRgC+YY5oWHiEpADiwqKwlDSMYPgc3HyUBLAy6Jyc6HIKSpLSpYpIKm5aarokBhq6FiZWgdb1fgaOLgiuJjqBRn7eJjYWPTbBNhGRIPg0yUrROATE5FS09EwsYOVSsvLVoKoDWloGTSY9nQa6fmNqag7ObmqBFiQ2MyYTI0CGgCgUCESiGHWcRIiREcFS6VOIAqxzKNXOagMahIJkM7XMvyBul+fTclhIVw0agsDSmgU0T3BIDWsU2FFy+HyhWKVT2MEOlROSnOriufhxNmJwRMIwC9Te-R8JFBVJmtMlkz8TJZGyIAtRSJFWlsEql-1ll1epIGPR0dl09ONJmpMrU8zCQA */
  createMachine({
    id: "(machine)",
    initial: "On home page",
    states: {
      "On home page": {
        on: {
          "Click guides": {
            target: "Guides open",
          },
        },
      },
      "Guides open": {
        on: {
          "Click installation": {
            target: "On installation page",
          },
        },
      },
      "On installation page": {},
    },
  });

const plans = dedupPathPlans(
  createModel(
    addTestsToMachine(machine, {
      "On home page": () => {
        cy.contains("JavaScript state machines and statecharts");
      },
    }),
    {
      events: {
        "Click guides": {
          exec: () => {
            cy.contains("Guides").click();
          },
        },
      },
    },
  ).getShortestPathPlans(),
);

describe("XState Docs", () => {
  beforeEach(() => {
    cy.visit("https://xstate.js.org/docs");
  });

  plans.forEach((plan) => {
    it(plan.description, () => {
      plan.test({});
    });
  });
});
