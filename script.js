function toggleFormSections() {
    const contactChannel = document.getElementById("contactChannel").value;

    const allForms = document.querySelectorAll(".contactForm");
    allForms.forEach(form => {
      form.style.display = "none";
    });

    if (contactChannel === "BOH - CND") {
        document.getElementById("bohForm").style.display = "block";
      } else if (contactChannel === "Social Media - CND") {
        document.getElementById("socialMediaForm").style.display = "block";
      } else if (contactChannel === "Hotline - CND") {
        document.getElementById("hotlineForm").style.display = "block";
      }      
  }
  

  function getRequiredFieldIds(channel) {
    if (channel === "Social Media - CND") {
      return [
        "caseNumberSM", "sfdcCaseNoSM", "receivedDateSM", "fromSM",
        "cepNumberSM", "billingAccountSM", "customerAccountSM",
        "accountNameSM", "serviceIdSM", "industryGroupSM",
        "concernSM", "reportedBySM", "additionalContactSM",
        "availabilitySM", "workingPermitSM", "testResultSM"
      ];
    } else if (channel === "Hotline - CND") {
      return [
        "caseNumberHL", "sfdcCaseNoHL", "cepNumberHL",
        "billingAccountHL", "customerAccountHL", "accountNameHL",
        "serviceIdHL", "industryGroupHL", "concernHL"
      ];
    } else if (channel === "BOH - CND") {
      return [
        "billingAccountBoh", "customerAccountBoh",
        "accountNameBoh", "serviceIdBoh","concernBoh","actionTakenBoh"
      ];
    }
    return [];
  }

function generateNote(type) {
  const channel = document.getElementById("contactChannel").value;
  const requiredFields = getRequiredFieldIds(channel);
  let hasEmpty = false;

  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (!field || !field.value.trim()) {
      field.classList.add("highlight");
      hasEmpty = true;
    } else {
      field.classList.remove("highlight");
    }
  });

  if (hasEmpty) {
    showAlert("Please fill in all required fields before generating the note.", "red");
    return;
  }

  let note = "";

  if (channel === "Social Media - CND") {
    const contactChannelSM = channel;
    const aniSM = document.getElementById("caseNumberSM")?.value || "";
    const sfdcCaseNoSM = document.getElementById("sfdcCaseNoSM")?.value || "";
    const cepNumberSM = document.getElementById("cepNumberSM")?.value || "";
    const receivedDateSM = document.getElementById("receivedDateSM")?.value || "";
    const fromSM = document.getElementById("fromSM")?.value || "";
    const billingAccountSM = document.getElementById("billingAccountSM")?.value || "";
    const customerAccountSM = document.getElementById("customerAccountSM")?.value || "";
    const accountNameSM = document.getElementById("accountNameSM")?.value || "";
    const serviceIdSM = document.getElementById("serviceIdSM")?.value || "";
    const industryGroupSM = document.getElementById("industryGroupSM")?.value || "";
    const concernSM = document.getElementById("concernSM")?.value || "";
    const reportedBySM = document.getElementById("reportedBySM")?.value || "";
    const additionalContactSM = document.getElementById("additionalContactSM")?.value || "";
    const availabilitySM = document.getElementById("availabilitySM")?.value || "";
    const workingPermitSM = document.getElementById("workingPermitSM")?.value || "";
    const clearviewTestResultSM = document.getElementById("testResultSM")?.value || "";
    const actionSM = document.getElementById("actionTakenSM")?.value || "";

    if (type === "standard") {
      note = `ANI: ${aniSM}\nSFDC Case No: ${sfdcCaseNoSM}\nCEP Number: ${cepNumberSM}\nReceived thru Enterprise SocMed Dated: ${receivedDateSM}\nFrom: ${fromSM}\nCustomer Account: ${customerAccountSM}\nBilling Account: ${billingAccountSM}\nAccount Name: ${accountNameSM}\nService ID: ${serviceIdSM}\nIndustry Group: ${industryGroupSM}\nConcern: ${concernSM}\nAction: ${actionSM}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR ${contactChannelSM}\nSFDC CASE NO: ${sfdcCaseNoSM}\nADDITIONAL CONTACT PERSON, NUMBER, AND EMAIL: ${additionalContactSM}\nWORKING PERMIT: ${workingPermitSM}\nAVAILABILITY DAY AND TIME: ${availabilitySM}\nCLEARVIEW TEST RESULT: ${clearviewTestResultSM}\nCOMPLAINT/WOCAS: ${concernSM}\nACTION: ${actionSM}`;
    } else if (type === "description") {
      note = `Concern: ${concernSM}\nReported By Contact Person and Phone: ${reportedBySM}\nAdditional Contact Person, Number, Email: ${additionalContactSM}\nWorking Permit: ${workingPermitSM}\nAvailability Day and Time: ${availabilitySM}`;
    }
  } else if (channel === "Hotline - CND") {
    const contactChannelHL = channel;
    const aniHL = document.getElementById("caseNumberHL")?.value || "";
    const sfdcCaseNoHL = document.getElementById("sfdcCaseNoHL")?.value || "";
    const cepNumberHL = document.getElementById("cepNumberHL")?.value || "";
    const billingAccountHL = document.getElementById("billingAccountHL")?.value || "";
    const customerAccountHL = document.getElementById("customerAccountHL")?.value || "";
    const accountNameHL = document.getElementById("accountNameHL")?.value || "";
    const serviceIdHL = document.getElementById("serviceIdHL")?.value || "";
    const industryGroupHL = document.getElementById("industryGroupHL")?.value || "";
    const concernHL = document.getElementById("concernHL")?.value || "";
    const reportedByHL = document.getElementById("reportedByHL")?.value || "";
    const additionalContactHL = document.getElementById("additionalContactHL")?.value || "";
    const availabilityHL = document.getElementById("availabilityHL")?.value || "";
    const workingPermitHL = document.getElementById("workingPermitHL")?.value || "";
    const clearviewTestResultHL = document.getElementById("testResultHL")?.value || "";
    const actionHL = document.getElementById("actionTakenHL")?.value || "";

    if (type === "standard") {
      note = `ANI: ${aniHL}\nSFDC Case No: ${sfdcCaseNoHL}\nCEP Number: ${cepNumberHL}\nCustomer Account: ${customerAccountHL}\nBilling Account: ${billingAccountHL}\nAccount Name: ${accountNameHL}\nService ID: ${serviceIdHL}\nIndustry Group: ${industryGroupHL}\nConcern: ${concernHL}\nAction: ${actionHL}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR ${contactChannelHL}\nSFDC CASE NO: ${sfdcCaseNoHL}\nADDITIONAL CONTACT PERSON, NUMBER, AND EMAIL: ${additionalContactHL}\nWORKING PERMIT: ${workingPermitHL}\nAVAILABILITY DAY AND TIME: ${availabilityHL}\nCLEARVIEW TEST RESULT: ${clearviewTestResultHL}\nCOMPLAINT/WOCAS: ${concernHL}\nACTION: ${actionHL}`;
    } else if (type === "description") {
      note = `Concern: ${concernHL}\nReported By Contact Person and Phone: ${reportedByHL}\nAdditional Contact: ${additionalContactHL}\nWorking Permit: ${workingPermitHL}\n Availability Day and Time: ${availabilityHL}`;
    }
  } else if (channel === "BOH - CND") {
    const billingAccountBoh = document.getElementById("billingAccountBoh")?.value || "";
    const customerAccountBoh = document.getElementById("customerAccountBoh")?.value || "";
    const accountNameBoh = document.getElementById("accountNameBoh")?.value || "";
    const serviceIdBoh = document.getElementById("serviceIdBoh")?.value || "";
    const concernBoh = document.getElementById("concernBoh")?.value || "";
    const actionBoh = document.getElementById("actionTakenBoh")?.value || "";

    if (type === "standard") {
      note = `Customer Account: ${customerAccountBoh}\nBilling Account: ${billingAccountBoh}\nAccount Name: ${accountNameBoh}\nService ID: ${serviceIdBoh}\nConcern: ${concernBoh}\nAction: ${actionBoh}`;
    }
  }

  navigator.clipboard
    .writeText(note)
    .then(() => {
      showAlert("Note copied to clipboard!");
    })
    .catch((err) => {
      showAlert("Failed to copy note. Displaying note below:");
      showAlert(note);
    });
}
  
function showAlert(message, color = "green") {
    const alertDiv = document.getElementById("alert");
    alertDiv.textContent = message;
    alertDiv.style.backgroundColor = color;

    alertDiv.style.display = "block";

    setTimeout(() => {
        alertDiv.classList.add("fade-out");
    }, 2000);

    setTimeout(() => {
        alertDiv.style.display = "none";
        alertDiv.classList.remove("fade-out");
    }, 3000);
}

function resetForm() {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((el) => {
      el.value = "";
      el.classList.remove("highlight");
    });
  
    const forms = document.querySelectorAll(".contactForm");
    forms.forEach((form) => (form.style.display = "none"));
  
    document.getElementById("contactChannel").value = "";
  }
  
