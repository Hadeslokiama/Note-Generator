function toggleFormSections() {
  const contactChannel = document.getElementById("contactChannel").value;

  // Hide all sections first
  const sections = document.querySelectorAll(".contactForm");
  sections.forEach((section) => (section.style.display = "none"));

  // Show the corresponding section based on the Contact Channel selection
  if (contactChannel === "SocialMedia") {
    document.getElementById("socialMediaForm").style.display = "block";
  } else if (contactChannel === "Hotline") {
    document.getElementById("hotlineForm").style.display = "block";
  } else if (contactChannel === "BOH") {
    document.getElementById("bohForm").style.display = "block";
  }
}

function generateNote(type) {
  // Get form input values
  const contactChannel = document.querySelector(
    '[aria-label="Working Permit"]'
  ).value;
  const ani = document.querySelector('[aria-label="ANI"]').value;
  const sfdcCaseNo = document.querySelector('[aria-label="SFDCCaseNo"]').value;
  const cepNumber = document.querySelector('[aria-label="CEPNumber"]').value;
  const billingAccount = document.querySelector('[aria-label="BA"]').value;
  const customerAccount = document.querySelector('[aria-label="CRM"]').value;
  const accountName = document.querySelector(
    '[aria-label="AccountName"]'
  ).value;
  const serviceId = document.querySelector('[aria-label="ServiceID"]').value;
  const industryGroup = document.querySelector(
    '[aria-label="IndustryGroup"]'
  ).value;
  const concern = document.querySelector(
    '[aria-label="AdditionalRemarks"]'
  ).value;
  const reportedBy = document.querySelector('[aria-label="ReportedBy"]').value;
  const additionalContact = document.querySelector(
    '[aria-label="AdditionalContactInformation"]'
  ).value;
  const workingPermit = document.querySelector(
    '[aria-label="WorkingPermit"]'
  ).value;
  const telephoneStatus = document.querySelector(
    '[aria-label="TelephoneStatus"]'
  ).value;
  const onuSerialNumber = document.querySelector(
    '[aria-label="SerialNumber"]'
  ).value;
  const onuLightStatus = document.querySelector(
    '[aria-label="LightStatus"]'
  ).value;
  const parentTicket = document.querySelector('[aria-label="PTNumber"]').value;
  const clearviewTestResult = document.querySelector(
    '[aria-label="TestResult"]'
  ).value;
  const requiredAction = document.querySelector(
    '[aria-label="RequiredAction"]'
  ).value;
  const flmTroubleshooting = document.querySelector(
    '[aria-label="FLMTroubleshooting"]'
  ).value;
  const additionalRemarks = document.querySelector(
    '[aria-label="AdditionalRemarks"]:last-child'
  ).value;

  // Generate note format based on button type
  let note = "";
  if (type === "standard") {
    note = `Standard Note\n
    Contact Channel: ${contactChannel}\n
    ANI: ${ani}\n
    SFDC Case No: ${sfdcCaseNo}\n
    CEP Number: ${cepNumber}\n
    Billing Account: ${billingAccount}\n
    Customer Account: ${customerAccount}\n
    Account Name: ${accountName}\n
    Service ID: ${serviceId}\n
    Industry Group: ${industryGroup}\n
    Concern: ${concern}\n
    Reported By: ${reportedBy}\n
    Additional Contact: ${additionalContact}\n
    Working Permit: ${workingPermit}\n
    Telephone Status: ${telephoneStatus}\n
    ONU Serial Number: ${onuSerialNumber}\n
    ONU Light Status: ${onuLightStatus}\n
    Parent Ticket Number: ${parentTicket}\n
    Clearview Test Result: ${clearviewTestResult}\n
    Required Action: ${requiredAction}\n
    FLM Troubleshooting: ${flmTroubleshooting}\n
    Additional Remarks: ${additionalRemarks}`;
  } else if (type === "cep") {
    note = `CEP Note\nANI: ${ani}\n
    SFDC Case No: ${sfdcCaseNo}\n
    CEP Number: ${cepNumber}\n
    Account Name: ${accountName}\n
    Service ID: ${serviceId}\n
    Reported By: ${reportedBy}\n
    Telephone Status: ${telephoneStatus}\n
    Required Action: ${requiredAction}\n
    Additional Remarks: ${additionalRemarks}`;
  } else if (type === "description") {
    note = `Description Note\n
    Customer: ${accountName}\n
    Service ID: ${serviceId}\n
    Concern: ${concern}\n
    Action Required: ${requiredAction}\n
    Report: ${additionalRemarks}`;
  }

  // Copy note to clipboard
  navigator.clipboard
    .writeText(note)
    .then(() => {
      alert("Note copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy note. Displaying note below:");
      alert(note); // Show note in case copying fails
    });
}

function resetForm() {
  document.querySelector("form").reset();
  const sections = document.querySelectorAll(".contactForm");
  sections.forEach((section) => (section.style.display = "none"));
}
