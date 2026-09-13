import { submitDemoRequest } from "./src/lib/subscription";

async function run() {
  try {
    console.log("Submitting valid demo request...");
    await submitDemoRequest({
      fullName: "Test Agent",
      workEmail: "agent@test.com",
      organization: "Test Org",
      message: "Testing remote migration"
    });
    console.log("✅ Successfully submitted demo request!");

    console.log("Testing failure on short name...");
    try {
      await submitDemoRequest({
        fullName: "A",
        workEmail: "agent@test.com",
        organization: "Test Org"
      });
      console.log("❌ Should have failed on short name!");
    } catch (e: any) {
      console.log("✅ Caught expected error for short name:", e.message);
    }

  } catch (e: any) {
    console.error("❌ Error during demo request:", e.message);
  }
}

run();
