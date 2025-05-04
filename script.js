function toggleFormSections() {
  const contactChannel = document.getElementById("contactChannel").value;
  const allForms = document.querySelectorAll(".contactForm");
  allForms.forEach((form) => {
    form.style.display = "none";
  });

  if (contactChannel === "BOH - CND") {
    document.getElementById("bohForm").style.display = "block";
  } else if (contactChannel === "SOCIAL MEDIA - CND") {
    document.getElementById("socialMediaForm").style.display = "block";
  } else if (contactChannel === "HOTLINE - CND") {
    document.getElementById("hotlineForm").style.display = "block";
  }
}

function handleCustomReset(evt) {
  if (evt) evt.preventDefault();

  const currentChannel = document.getElementById("contactChannel").value;
                                                  
  document.querySelectorAll(".contactForm").forEach(form => {
    form.querySelectorAll("input, select, textarea").forEach(el => {
      if (el.id === "contactChannel") return;

      if (el.tagName.toLowerCase() === "select") {
        el.selectedIndex = 0;
      } else if (el.type !== "button" && el.type !== "submit" && el.type !== "reset") {
        el.value = "";
      }
    });
  });
  document.querySelectorAll(".subcategory-select").forEach(div => {
    div.style.display = "none";
  });

  toggleFormSections();
}
  
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", handleCustomReset);
});

function showRelevantSubcategory() {
  const smVisible  = document.getElementById("socialMediaForm").style.display === "block";
  const hlVisible  = document.getElementById("hotlineForm").style.display    === "block";
  const bohVisible = document.getElementById("bohForm").style.display        === "block";

  let selected = "";
  let prefix   = ""; 

  if (smVisible) {
    selected = document.getElementById("concernSM").value;
    prefix   = "SM";
  } else if (hlVisible) {
    selected = document.getElementById("concernHL").value;
    prefix   = "HL";
  } else if (bohVisible) {
    selected = document.getElementById("concernBoh").value;
    prefix   = "Boh"; 
  }

  document.querySelectorAll(`.subcategory-select[id^="subcat${prefix}-"]`).forEach(div => {
    div.style.display = "none";
  });

  const idFragment = mapConcernToId(selected);
  const wrapper    = document.getElementById(`subcat${prefix}-${idFragment}`);
  if (wrapper) {
    wrapper.style.display = "flex";

    const select = wrapper.querySelector("select");
    if (select) select.selectedIndex = 0;
  }
}

function getRequiredFieldIds(channel) {
  const requiredFields = [];

  if (channel === "SOCIAL MEDIA - CND") {
    requiredFields.push(
      "caseNumberSM", "sfdcCaseNoSM", "receivedDateSM", "fromSM",
      "cepNumberSM", "billingAccountSM", "customerAccountSM",
      "accountNameSM", "serviceIdSM", "industryGroupSM",
      "concernSM"
    );

    const concernValue = document.getElementById("concernSM")?.value;
    if (concernValue) {
      const subcatId = `subcategorySM-${mapConcernToId(concernValue)}`;
      requiredFields.push(subcatId);
    }
  } else if (channel === "HOTLINE - CND") {
    requiredFields.push(
      "caseNumberHL", "sfdcCaseNoHL", "cepNumberHL",
      "billingAccountHL", "customerAccountHL", "accountNameHL",
      "serviceIdHL", "industryGroupHL", "concernHL"
    );

    const concernValue = document.getElementById("concernHL")?.value;
    if (concernValue) {
      const subcatId = `subcategoryHL-${mapConcernToId(concernValue)}`;
      requiredFields.push(subcatId);
    }
  } else if (channel === "BOH - CND") {
    return [
      "billingAccountBoh", "customerAccountBoh",
      "accountNameBoh", "serviceIdBoh", "concernBoh"
    ];
  }

  return requiredFields;
}

function generateNote(type) {
  const channel = document.getElementById("contactChannel").value;
  const requiredFields = getRequiredFieldIds(channel);
  let hasEmpty = false;

  requiredFields.forEach((id) => {
    const field = document.getElementById(id);
    if (!field || field.value === "" || field.value === "Select" || field.value === "Select Category" || field.value === "Select Subcategory") {
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

  if (channel === "SOCIAL MEDIA - CND") {
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
    const rawconcernSMMain = document.getElementById("concernSM")?.value || "";
    const concernSMMain = rawconcernSMMain.replace(/concerns?/i, "").trim();
    const concernSMSub = document.getElementById(`subcategorySM-${mapConcernToId(rawconcernSMMain)}`)?.value || "";
    const isValidSub = concernSMSub && concernSMSub !== "Select Subcategory";
    const isValidMain = concernSMMain && concernSMMain !== "Select Category";
    
    let concernSM = "";
    
    if (isValidSub && isValidMain) {
      concernSM = `${concernSMMain} – ${concernSMSub}`;
    } else if (isValidSub) {
      concernSM = concernSMSub;
    } else if (isValidMain) {
      concernSM = concernSMMain;
    }

    const reportedBySM = document.getElementById("reportedBySM")?.value || "";
    const additionalContactSM = document.getElementById("additionalContactSM")?.value || "";
    const availabilitySM = document.getElementById("availabilitySM")?.value || "";
    const workingPermitSM = document.getElementById("workingPermitSM")?.value || "";
    const clearviewTestResultSM = document.getElementById("testResultSM")?.value || "";
    const actionSM = document.getElementById("actionTakenSM")?.value || "";

    if (type === "standard") {
      note = `ANI: ${aniSM}\nSFDC Case No: ${sfdcCaseNoSM}\nCEP Number: ${cepNumberSM}\nReceived thru Enterprise SocMed Dated: ${receivedDateSM}\nFrom: ${fromSM}\nCustomer Account: ${customerAccountSM}\nBilling Account: ${billingAccountSM}\nAccount Name: ${accountNameSM}\nService ID: ${serviceIdSM}\nIndustry Group: ${industryGroupSM}\nConcern: ${concernSM}\nAction: ${actionSM}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR: ${contactChannelSM}\nSFDC CASE NO: ${sfdcCaseNoSM}\nADDITIONAL CONTACT PERSON, NUMBER, AND EMAIL: ${additionalContactSM}\nWORKING PERMIT: ${workingPermitSM}\nAVAILABILITY DAY AND TIME: ${availabilitySM}\nCLEARVIEW TEST RESULT: ${clearviewTestResultSM}\nCOMPLAINT/WOCAS: ${concernSM}\nACTION: ${actionSM}`;
    } else if (type === "description") {
      note = `Concern: ${concernSM}\nReported By Contact Person and Phone: ${reportedBySM}\nAdditional Contact Person, Number, Email: ${additionalContactSM}\nWorking Permit: ${workingPermitSM}\nAvailability Day and Time: ${availabilitySM}`;
    }
  } else if (channel === "HOTLINE - CND") {
    const contactChannelHL = channel;
    const aniHL = document.getElementById("caseNumberHL")?.value || "";
    const sfdcCaseNoHL = document.getElementById("sfdcCaseNoHL")?.value || "";
    const cepNumberHL = document.getElementById("cepNumberHL")?.value || "";
    const billingAccountHL = document.getElementById("billingAccountHL")?.value || "";
    const customerAccountHL = document.getElementById("customerAccountHL")?.value || "";
    const accountNameHL = document.getElementById("accountNameHL")?.value || "";
    const serviceIdHL = document.getElementById("serviceIdHL")?.value || "";
    const industryGroupHL = document.getElementById("industryGroupHL")?.value || "";
    const rawConcernHLMain = document.getElementById("concernHL")?.value || "";
    const concernHLMain = rawConcernHLMain.replace(/concerns?/i, "").trim();
    const concernHLSub = document.getElementById(`subcategoryHL-${mapConcernToId(rawConcernHLMain)}`)?.value || "";
    const isValidSub = concernHLSub && concernHLSub !== "Select Subcategory";
    const isValidMain = concernHLMain && concernHLMain !== "Select Category";
    
    let concernHL = "";
    
    if (isValidSub && isValidMain) {
      concernHL = `${concernHLMain} – ${concernHLSub}`;
    } else if (isValidSub) {
      concernHL = concernHLSub;
    } else if (isValidMain) {
      concernHL = concernHLMain;
    }
    
    const wocasHL = document.getElementById("wocasHL")?.value || "";
    const reportedByHL = document.getElementById("reportedByHL")?.value || "";
    const additionalContactHL = document.getElementById("additionalContactHL")?.value || "";
    const availabilityHL = document.getElementById("availabilityHL")?.value || "";
    const workingPermitHL = document.getElementById("workingPermitHL")?.value || "";
    const clearviewTestResultHL = document.getElementById("testResultHL")?.value || "";
    const actionHL = document.getElementById("actionTakenHL")?.value || "";

    if (type === "standard") {
      note = `ANI: ${aniHL}\nSFDC Case No: ${sfdcCaseNoHL}\nCEP Number: ${cepNumberHL}\nCustomer Account: ${customerAccountHL}\nBilling Account: ${billingAccountHL}\nAccount Name: ${accountNameHL}\nService ID: ${serviceIdHL}\nIndustry Group: ${industryGroupHL}\nConcern: ${concernHL}\nAction: ${actionHL}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR: ${contactChannelHL}\nSFDC CASE NO: ${sfdcCaseNoHL}\nADDITIONAL CONTACT PERSON, NUMBER, AND EMAIL: ${additionalContactHL}\nWORKING PERMIT: ${workingPermitHL}\nAVAILABILITY DAY AND TIME: ${availabilityHL}\nCLEARVIEW TEST RESULT: ${clearviewTestResultHL}\nCOMPLAINT/WOCAS: ${wocasHL}\nACTION: ${actionHL}`;
    } else if (type === "description") {
      note = `Concern: ${concernHL}\nReported By Contact Person and Phone: ${reportedByHL}\nAdditional Contact: ${additionalContactHL}\nWorking Permit: ${workingPermitHL}\nAvailability Day and Time: ${availabilityHL}`;
    }
  }   if (channel === "BOH - CND") {
    const billingAccountBoh = document.getElementById("billingAccountBoh")?.value || "";
    const customerAccountBoh = document.getElementById("customerAccountBoh")?.value || "";
    const accountNameBoh = document.getElementById("accountNameBoh")?.value || "";
    const serviceIdBoh = document.getElementById("serviceIdBoh")?.value || "";
    const rawconcernBohMain = document.getElementById("concernBoh")?.value || "";
    const concernBohMain = rawconcernBohMain.replace(/concerns?/i, "").trim();
    const concernBohSub = document.getElementById(`subcategoryBoh-${mapConcernToId(rawconcernBohMain)}`)?.value || "";
    const isValidSub = concernBohSub && concernBohSub !== "Select Subcategory";
    const isValidMain = concernBohMain && concernBohMain !== "Select Category";

    let concernBoh = "";
    if (isValidSub && isValidMain) {
      concernBoh = `${concernBohMain} – ${concernBohSub}`;
    } else if (isValidSub) {
      concernBoh = concernBohSub;
    } else if (isValidMain) {
      concernBoh = concernBohMain;
    }

    const additionalBoh = document.getElementById("additionalBoh")?.value || "";

    if (type === "standard") {
      note = `Customer Account: ${customerAccountBoh}\nBilling Account: ${billingAccountBoh}\nAccount Name: ${accountNameBoh}\nService ID: ${serviceIdBoh}\nConcern: ${concernBoh}\nAdditional Remarks: ${additionalBoh}`;
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

function updateSubcategoryOptions() {
  const category = document.getElementById("category").value;
  const subcategoryGroup = document.getElementById("subcategoryGroup");
  const subcategorySelect = document.getElementById("subcategory");

  const subcategories = {
    "Non Voc": ["Home Concerns", "Smart Concerns", "164 / Bantay Cable"],
    "Complaint": [
      "Cannot Browse", "Frequent Disconnection", "Low BW", "No Internet Connection (NIC)",
      "Redirected To PLDT Sites", "Selective Browsing", "Slow Browsing", "Webpage Not Loading",
      "Outage or Network Trouble", "Other Complaint", "WAR Service Request", "VD-Degraded Voice and Data",
      "VD-No Voice and Data", "Cannot Call To Specific Number", "Cannot Receive Call",
      "Continuous/Delayed Dialtone", "Crosstalk", "Cut Calls", "Fast Busy Tone", "No Dialtone",
      "Noisy", "Poor Reception/Transmission", "Receives Wrong Number", "With Recording"
    ],
    "Inquiry": [
      "Account Related Inquiry", "Aftersales Inquiry Account Maintenance", "Aftersales Inquiry Account Migration",
      "Aftersales Inquiry Change Number", "Aftersales Inquiry Disconnection", "Aftersales Inquiry Migration",
      "Aftersales Inquiry Reconnection", "Aftersales Inquiry Relocation", "Aftersales Inquiry Special Feature",
      "Aftersales Inquiry Supersedure", "Aftersales Inquiry Bridge Mode Configuration", "Aftersales Inquiry Upgrade",
      "Aftersales Inquiry Downgrade", "Aftersales Inquiry Reconnection from TD", "Aftersales Inquiry Reconnection from OP",
      "Other Aftersales Inquiry", "General Inquiries", "SSC Info", "Product Inquiry", "Promo Inquiry"
    ],
    "Aftersales Request": [
      "Request Account Maintenance", "Request Account Migration", "Request Bridge Mode Configuration",
      "Request Change Number", "Request Disconnection", "Request Migration", "Request Reconnection",
      "Request Relocation", "Request Special Feature", "Request Supersedure", "Other Aftersales Request",
      "Request Upgrade", "Request Downgrade", "Request Reconnection from TD", "Request Reconnection from OP",
      "Request Balance Transfer", "Request Refund", "Request Additional Service", "Request New Application",
      "Other Request"
    ],
    "Follow-up Within SLA": [
      "Repair Complex", "Repair Data", "Repair Voice", "Repair Voice and Data", "Repair WAR SR",
      "Aftersales Reconnection from TD", "Aftersales Reconnection from OP", "Aftersales Account Maintenance",
      "Aftersales Account Migration", "Aftersales Bridge Mode Configuration", "Aftersales Change Number",
      "Aftersales Disconnection", "Aftersales Migration", "Aftersales Relocation", "Aftersales Special Feature",
      "Aftersales Supersedure", "Aftersales Upgrade", "Aftersales Downgrade", "Aftersales New Application"
    ],
    "Follow-up Beyond SLA": [
      "Repair Complex", "Repair Data", "Repair Voice", "Repair Voice and Data", "Repair WAR SR",
      "Aftersales Reconnection from TD", "Aftersales Reconnection from OP", "Aftersales Account Maintenance",
      "Aftersales Account Migration", "Aftersales Bridge Mode Configuration", "Aftersales Change Number",
      "Aftersales Disconnection", "Aftersales Migration", "Aftersales Relocation", "Aftersales Special Feature",
      "Aftersales Supersedure", "Aftersales Upgrade", "Aftersales Downgrade", "Aftersales New Application"
    ],
    "Billing": [
      "Billing Inq Account Balance", "Billing Inq BOL", "Billing Inq Tolls", "Other Billing Inquiry",
      "Payment Details/Posting", "Bill Delivery Dispute", "MRC/NRC", "Payment (Unreflected/Misapplied )",
      "Rebate (Non Service)", "Non-receipt of Billing Invoice (BI)", "BOL/e PORTAL ISSUE cant access",
      "BOL/e PORTAL ISSUE  BI not visible", "BOL/e PORTAL ISSUE cannot download BI",
      "BOL/e PORTAL ISSUE payment module error"
    ]
  };

  subcategorySelect.innerHTML = "";

  if (subcategories[category]) {
    subcategories[category].forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      subcategorySelect.appendChild(option);
    });
    subcategoryGroup.style.display = "flex";
  } else {
    subcategoryGroup.style.display = "none";
  }
}
function mapConcernToId(concern = "") {
  return (concern || "").replace(/[^a-zA-Z0-9]/g, "");
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
/*function resetForm() {
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((el) => {
    el.value = "";
    el.classList.remove("highlight");
  });

  const forms = document.querySelectorAll(".contactForm");
  forms.forEach((form) => (form.style.display = "none"));

  document.getElementById("contactChannel").value = "";
}*/

