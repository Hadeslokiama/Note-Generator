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
    note = `Standard Note\nContact Channel: ${contactChannel}\nANI: ${ani}\nSFDC Case No: ${sfdcCaseNo}\nCEP Number: ${cepNumber}\nBilling Account: ${billingAccount}\nCustomer Account: ${customerAccount}\nAccount Name: ${accountName}\nService ID: ${serviceId}\nIndustry Group: ${industryGroup}\nConcern: ${concern}\nReported By: ${reportedBy}\nAdditional Contact: ${additionalContact}\nWorking Permit: ${workingPermit}\nTelephone Status: ${telephoneStatus}\nONU Serial Number: ${onuSerialNumber}\nONU Light Status: ${onuLightStatus}\nParent Ticket Number: ${parentTicket}\nClearview Test Result: ${clearviewTestResult}\nRequired Action: ${requiredAction}\nFLM Troubleshooting: ${flmTroubleshooting}\nAdditional Remarks: ${additionalRemarks}`;
  } else if (type === "cep") {
    note = `CEP Note\nANI: ${ani}\nSFDC Case No: ${sfdcCaseNo}\nCEP Number: ${cepNumber}\nAccount Name: ${accountName}\nService ID: ${serviceId}\nReported By: ${reportedBy}\nTelephone Status: ${telephoneStatus}\nRequired Action: ${requiredAction}\nAdditional Remarks: ${additionalRemarks}`;
  } else if (type === "description") {
    note = `Description Note\nCustomer: ${accountName}\nService ID: ${serviceId}\nConcern: ${concern}\nAction Required: ${requiredAction}\nReport: ${additionalRemarks}`;
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
