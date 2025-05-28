window.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".contactForm").forEach((form) => {
    form.style.display = "none";
  });

  
  ["fullBtn", "cepBtn", "descBtn", "specBtn", "stdBtn", "abcaBtn", "resetBtn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = "none";
  });

  
  const contactChannelDropdown = document.getElementById("contactChannel");
  if (contactChannelDropdown) {
    contactChannelDropdown.addEventListener("change", toggleFormSections);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const outageSelect = document.getElementById("outageCheckHL");
  const parentTicketInput = document.getElementById("parentTicketHL");

  outageSelect.addEventListener("change", function () {
    if (this.value === "No") {
      parentTicketInput.value = "N/A";
      parentTicketInput.readOnly = true;
    } else if (this.value === "Yes") {
      parentTicketInput.value = "";
      parentTicketInput.readOnly = false;
    }
  });
});

function toggleFormSections() {
  const contactChannel = document.getElementById("contactChannel").value;
  const allForms = document.querySelectorAll(".contactForm");

  allForms.forEach((form) => {
    form.style.display = "none";
  });

  const allButtons = ["fullBtn", "cepBtn", "descBtn", "specBtn", "stdBtn", "resetBtn", "abcaBtn"];
  allButtons.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = "none";
  });

  if (!contactChannel) return; 

  if (contactChannel === "BOH - CND") {
    document.getElementById("bohForm").style.display = "block";
  } else if (contactChannel === "SOCIAL MEDIA - CND") {
    document.getElementById("socialMediaForm").style.display = "block";
  } else if (contactChannel === "HOTLINE - CND") {
    document.getElementById("hotlineForm").style.display = "block";
  }

  if (contactChannel === "BOH - CND") {
    document.getElementById("bohForm").style.display = "block";

    showButtons(["stdBtn", "resetBtn"]);
  } else if (contactChannel === "SOCIAL MEDIA - CND") {
    document.getElementById("socialMediaForm").style.display = "block";

    showButtons(["stdBtn", "cepBtn", "descBtn", "specBtn", "resetBtn"]);
  } else if (contactChannel === "HOTLINE - CND") {
    document.getElementById("hotlineForm").style.display = "block";

    showButtons(["abcaBtn", "fullBtn", "cepBtn", "descBtn", "specBtn", "resetBtn"]);
  }
}

  function showButtons(buttonIds) {
  buttonIds.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = "inline-flex";
  });
}

function handleCustomReset(evt) {
  if (evt) evt.preventDefault();

  document.querySelectorAll(".contactForm").forEach((form) => {
    form.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.id === "contactChannel") return;

      if (el.tagName.toLowerCase() === "select") {
        el.selectedIndex = 0;
      } else if (
        el.type !== "button" &&
        el.type !== "submit" &&
        el.type !== "reset"
      ) {
        el.value = "";
      }
    });
  });
  document.querySelectorAll(".subcategory-select").forEach((div) => {
    div.style.display = "none";
  });

  toggleFormSections();
}

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", handleCustomReset);
});

function showRelevantSubcategory() {
  const smVisible =
    document.getElementById("socialMediaForm").style.display === "block";
  const hlVisible =
    document.getElementById("hotlineForm").style.display === "block";
  const bohVisible =
    document.getElementById("bohForm").style.display === "block";

  let selected = "";
  let prefix = "";

  if (smVisible) {
    selected = document.getElementById("concernSM").value;
    prefix = "SM";
  } else if (hlVisible) {
    selected = document.getElementById("concernHL").value;
    prefix = "HL";
  } else if (bohVisible) {
    selected = document.getElementById("concernBoh").value;
    prefix = "Boh";
  }

  document
    .querySelectorAll(`.subcategory-select[id^="subcat${prefix}-"]`)
    .forEach((div) => {
      div.style.display = "none";
    });

  const idFragment = mapConcernToId(selected);
  const wrapper = document.getElementById(`subcat${prefix}-${idFragment}`);
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
      "caseNumberSM",
      "receivedDateSM",
      "fromSM",
      "billingAccountSM",
      "customerAccountSM",
      "accountNameSM",
      "serviceIdSM",
      "industryGroupSM",
      "concernSM"
    );

    const concernValue = document.getElementById("concernSM")?.value;
    if (concernValue) {
      const subcatId = `subcategorySM-${mapConcernToId(concernValue)}`;
      requiredFields.push(subcatId);
    }
  } else if (channel === "HOTLINE - CND") {
    requiredFields.push(
      "caseNumberHL",
      "billingAccountHL",
      "accountNameHL",
      "serviceIdHL",
      "industryGroupHL",
      "concernHL"
    );

    const concernValue = document.getElementById("concernHL")?.value;
    if (concernValue) {
      const subcatId = `subcategoryHL-${mapConcernToId(concernValue)}`;
      requiredFields.push(subcatId);
    }
  } else if (channel === "BOH - CND") {
    return [
      "billingAccountBoh",
      "customerAccountBoh",
      "accountNameBoh",
      "serviceIdBoh",
      "concernBoh",
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
    if (
      !field ||
      field.value === "" ||
      field.value === "Select" ||
      field.value === "Select Category" ||
      field.value === "Select Subcategory"
    ) {
      field.classList.add("highlight");
      hasEmpty = true;
    } else {
      field.classList.remove("highlight");
    }
  });

  if (hasEmpty) {
    showAlert(
      "Please fill in all required fields before generating the note.",
      "red"
    );
    return;
  }

  let note = "";

  if (channel === "SOCIAL MEDIA - CND") {
    const outageDropdown = document.getElementById("outageCheckSM");
    const parentTicketInput = document.getElementById("parentTicketSM");

    if (outageDropdown?.value === "No") {
      parentTicketInput.value = "N/A";
      parentTicketInput.readOnly = true;
    } else {
      parentTicketInput.readOnly = false; 
    }

    const contactChannelSM = channel;
    const aniSM = document.getElementById("caseNumberSM")?.value || "";
    const sfdcCaseNoSM = document.getElementById("sfdcCaseNoSM")?.value || "";
    const cepNumberSM = document.getElementById("cepNumberSM")?.value || "";
    const receivedDateSM =
      document.getElementById("receivedDateSM")?.value || "";
    const fromSM = document.getElementById("fromSM")?.value || "";
    const billingAccountSM =
      document.getElementById("billingAccountSM")?.value || "";
    const customerAccountSM =
      document.getElementById("customerAccountSM")?.value || "";
    const accountNameSM = document.getElementById("accountNameSM")?.value || "";
    const serviceIdSM = document.getElementById("serviceIdSM")?.value || "";
    const industryGroupSM =
      document.getElementById("industryGroupSM")?.value || "";
    const rawconcernSMMain = document.getElementById("concernSM")?.value || "";
    const concernSMMain = rawconcernSMMain.replace(/concerns?/i, "").trim();
    const concernSMSub =
      document.getElementById(
        `subcategorySM-${mapConcernToId(rawconcernSMMain)}`
      )?.value || "";
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
    const wocasSM = document.getElementById("wocasSM")?.value || "";
    const reportedPerSM = document.getElementById("reportedPerSM")?.value || "";
    const reportedConSM = document.getElementById("reportedConSM")?.value || "";
    const contactPerSM = document.getElementById("contactPerSM")?.value || "";
    const contactNumSM = document.getElementById("contactNumSM")?.value || "";
    const emailAddressSM =
      document.getElementById("emailAddressSM")?.value || "";
    const aOCPSM = document.getElementById("aOCPSM")?.value || "";
    const aOCNSM = document.getElementById("aOCNSM")?.value || "";
    const availabilitySM =
      document.getElementById("availabilitySM")?.value || "";
    const workingPermitSM =
      document.getElementById("workingPermitSM")?.value || "N/A";
    const requiredActionSM =
      document.getElementById("requiredActionSM")?.value || "N/A";
    const onuSerialSM = document.getElementById("onuSerialSM")?.value || "";
    const onuStatusSM = document.getElementById("onuStatusSM")?.value || "N/A";
    const parentTicketSM =
      document.getElementById("parentTicketSM")?.value || "N/A";
    const outageCheckSM =
      document.getElementById("outageCheckSM")?.value || "No";
    const clearviewTestResultSM =
      document.getElementById("testResultSM")?.value || "";
    const flmSM = document.getElementById("flmSM")?.value || "";
    const actionSM = document.getElementById("actionTakenSM")?.value || "";

    if (type === "standard") {
      note = `Case Number: ${aniSM}\nCEP Case No/Fault Ticket No: ${cepNumberSM}\nSFDC Case No: ${sfdcCaseNoSM}\nReceived thru Enterprise SocMed Dated: ${receivedDateSM}\nFrom (Social Persona): ${fromSM}\nCustomer Account Number: ${customerAccountSM}\nBilling Account Number: ${billingAccountSM}\nIndustry Group: ${industryGroupSM}\nAccount Name: ${accountNameSM}\nService ID: ${serviceIdSM}\nConcern: ${concernSM}\nAction Taken: ${actionSM}`;
    } else if (type === "special") {
      note = `Contact Person: ${contactPerSM}\nContact Number: ${contactNumSM}\nContact Email Address: ${emailAddressSM}\nAdditional Contact Person: ${aOCPSM}\nAdditional Contact Number: ${aOCNSM}\nAvailable Date and Time: ${availabilitySM}\nWorking Permit: ${workingPermitSM}\nReported Contact Person: ${reportedPerSM}\nReported Contact Number: ${reportedConSM}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR: ${contactChannelSM}\nSFDC Case No: ${sfdcCaseNoSM}\nContact Person: ${contactPerSM}\nContact Number: ${contactNumSM}\nContact Email Address: ${emailAddressSM}\nAdditional Contact Person: ${aOCPSM}\nAdditional Contact Number: ${aOCNSM}\nWorking Permit: ${workingPermitSM}\nAvailable Date and Time: ${availabilitySM}\nSerial Number: ${onuSerialSM}\nIs there a Parent Ticket: ${outageCheckSM}\nParent Ticket: ${parentTicketSM}\nONU Light Status: ${onuStatusSM}\nFLM Troubleshooting: ${flmSM}\nClearview Test Result: ${clearviewTestResultSM}\nRequired Action: ${requiredActionSM}\nWOCAS: ${wocasSM}\nAction Taken: ${actionSM}`;
    } else if (type === "description") {
      note = `Concern: ${concernSM}\n\nContact Person: ${contactPerSM}\nContact Number: ${contactNumSM}\nContact Email Address: ${emailAddressSM}\nAdditional Contact Person: ${aOCPSM}\nAdditional Contact Number: ${aOCNSM}\nAvailability Day and Time: ${availabilitySM}\nWorking Permit: ${workingPermitSM}`;
    }
  } else if (channel === "HOTLINE - CND") {
    const outageDropdown = document.getElementById("outageCheckHL");
    const parentTicketInput = document.getElementById("parentTicketHL");

    if (outageDropdown?.value === "No") {
      parentTicketInput.value = "N/A";
      parentTicketInput.readOnly = true;
    } else {
      parentTicketInput.readOnly = false; 
    }

    const contactChannelHL = channel;
    const aniHL = document.getElementById("caseNumberHL")?.value || "";
    const sfdcCaseNoHL = document.getElementById("sfdcCaseNoHL")?.value || "";
    const cepNumberHL = document.getElementById("cepNumberHL")?.value || "";
    const billingAccountHL =
      document.getElementById("billingAccountHL")?.value || "";
    const customerAccountHL = document.getElementById("customerAccountHL")?.value || "";
    const accountNameHL = document.getElementById("accountNameHL")?.value || "";
    const serviceIdHL = document.getElementById("serviceIdHL")?.value || "";
    const industryGroupHL =
      document.getElementById("industryGroupHL")?.value || "";
    const rawConcernHLMain = document.getElementById("concernHL")?.value || "";
    const concernHLMain = rawConcernHLMain.replace(/concerns?/i, "").trim();
    const concernHLSub =
      document.getElementById(
        `subcategoryHL-${mapConcernToId(rawConcernHLMain)}`
      )?.value || "";
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
    const contactPerHL = document.getElementById("contactPerHL")?.value || "";
    const contactNumHL = document.getElementById("contactNumHL")?.value || "";
    const emailAddressHL =
      document.getElementById("emailAddressHL")?.value || "";
    const aOCPHL = document.getElementById("aOCPHL")?.value || "";
    const aOCNHL = document.getElementById("aOCNHL")?.value || "";
    const availabilityHL =
      document.getElementById("availabilityHL")?.value || "";
    const workingPermitHL =
      document.getElementById("workingPermitHL")?.value || "N/A";
    const requiredActionHL =
      document.getElementById("requiredActionHL")?.value || "N/A";
    const onuSerialHL = document.getElementById("onuSerialHL")?.value || "";
    const onuStatusHL = document.getElementById("onuStatusHL")?.value || "N/A";
    const parentTicketHL =
      document.getElementById("parentTicketHL")?.value || "N/A";
    const outageCheckHL =
      document.getElementById("outageCheckHL")?.value || "No";
    const flmHL = document.getElementById("flmHL")?.value || "";
    const clearviewTestResultHL =
      document.getElementById("testResultHL")?.value || "";
    const actionHL = document.getElementById("actionTakenHL")?.value || "";

    if (type === "abca") {
      note = `ANI: ${aniHL}\nBilling Account Number: ${billingAccountHL}\nService ID: ${serviceIdHL}\nConcern: ${concernHL}\nWOCAS: ${wocasHL}\nAction: ${actionHL}`;
    } else if (type === "full") {
      note = `ANI: ${aniHL}\nCEP Case No/Fault Ticket No: ${cepNumberHL}\nSFDC Case No: ${sfdcCaseNoHL}\nBilling Account Number: ${billingAccountHL}\nAccount Name: ${accountNameHL}\nService ID: ${serviceIdHL}\nIndustry Group: ${industryGroupHL}\nConcern: ${concernHL}\nComplaint/WOCAS: ${wocasHL}\nContact Person: ${contactPerHL}\nContact Number: ${contactNumHL}\nEmail Address: ${emailAddressHL}\nAdditional Contact Person: ${aOCPHL}\nAdditional Contact Number: ${aOCNHL}\nAvailability Day and Time: ${availabilityHL}\nWorking Permit: ${workingPermitHL}\nONU Serial Number: ${onuSerialHL}\nONU Light Status: ${onuStatusHL}\nIs there a Parent Ticket: ${outageCheckHL}\nParent Ticket Number: ${parentTicketHL}\nClearview Test Result: ${clearviewTestResultHL}\nRequired Action: ${requiredActionHL}\nFLM Troubleshooting: ${flmHL}\nAction Taken: ${actionHL}`;
    } else if (type === "cep") {
      note = `CONTACT CHANNEL-VENDOR: ${contactChannelHL}\nSFDC Case No: ${sfdcCaseNoHL}\nContact Person: ${contactPerHL}\nContact Number: ${contactNumHL}\nContact Email Address: ${emailAddressHL}\nAdditional Contact Person: ${aOCPHL}\nAdditional Contact Number: ${aOCNHL}\nWorking Permit: ${workingPermitHL}\nAvailable Day and Time: ${availabilityHL}\nClearview Test Result: ${clearviewTestResultHL}\nWOCAS: ${wocasHL}\nRequired Action: ${requiredActionHL}\nONU Serial Number: ${onuSerialHL}\nONU Light Status: ${onuStatusHL}\nFLM Troubleshooting: ${flmHL}\nIs there a Parent Ticket: ${outageCheckHL}\nParent Ticket Number: ${parentTicketHL}\nAdditional Remarks: ${actionHL}`;
    } else if (type === "description") {
      note = `Concern: ${concernHL}\n\nContact Person: ${contactPerHL}\nContact Number: ${contactNumHL}\nEmail Address: ${emailAddressHL}\nAdditional Onsite Contact Person: ${aOCPHL}\nAdditional Onsite Contact Number: ${aOCNHL}\nAvailability Day and Time: ${availabilityHL}\nWorking Permit: ${workingPermitHL}`;
    } else if (type === "special") {
      note = `Contact Person: ${contactPerHL}\nContact Number: ${contactNumHL}\nEmail Address: ${emailAddressHL}\nAdditional Contact Person: ${aOCPHL}\nAdditional Contact Number: ${aOCNHL}\nWorking Permit: ${workingPermitHL}\nAvailable Date and Time: ${availabilityHL}`;
    }
  }
  if (channel === "BOH - CND") {
    const billingAccountBoh =
      document.getElementById("billingAccountBoh")?.value || "";
    const customerAccountBoh =
      document.getElementById("customerAccountBoh")?.value || "";
    const accountNameBoh =
      document.getElementById("accountNameBoh")?.value || "";
    const serviceIdBoh = document.getElementById("serviceIdBoh")?.value || "";
    const rawconcernBohMain =
      document.getElementById("concernBoh")?.value || "";
    const concernBohMain = rawconcernBohMain.replace(/concerns?/i, "").trim();
    const concernBohSub =
      document.getElementById(
        `subcategoryBoh-${mapConcernToId(rawconcernBohMain)}`
      )?.value || "";
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

    const actionTakenBoh =
      document.getElementById("actionTakenBoh")?.value || "";

    if (type === "standard") {
      note = `Account Name: ${accountNameBoh}\nCustomer Account Number: ${customerAccountBoh}\nBilling Account Number: ${billingAccountBoh}\nService ID: ${serviceIdBoh}\nConcern: ${concernBoh}\nAction Taken: ${actionTakenBoh}`;
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
    "Non Voc": [
      "Non Voc",
      "N/A",
      "Home Concerns",
      "Smart Concerns",
      "164 / Bantay Cable",
    ],
    Complaint: [
      "Cannot Browse",
      "Frequent Disconnection",
      "Low BW",
      "No Internet Connection (NIC)",
      "Redirected To PLDT Sites",
      "Selective Browsing",
      "Slow Browsing",
      "Webpage Not Loading",
      "Outage or Network Trouble",
      "Other Complaint",
      "WAR Service Request",
      "VD-Degraded Voice and Data",
      "VD-No Voice and Data",
      "Cannot Call To Specific Number",
      "Cannot Receive Call",
      "Continuous/Delayed Dialtone",
      "Crosstalk",
      "Cut Calls",
      "Fast Busy Tone",
      "No Dialtone",
      "Noisy",
      "Poor Reception/Transmission",
      "Receives Wrong Number",
      "With Recording",
    ],
    Inquiry: [
      "Account Related Inquiry",
      "Inquiry Account Maintenance",
      "Inquiry Account Migration",
      "Inquiry Change Number",
      "Inquiry Disconnection",
      "Inquiry Migration",
      "Inquiry Reconnection",
      "Inquiry Relocation",
      "Inquiry Special Feature",
      "Inquiry Supersedure",
      "Inquiry Bridge Mode Configuration",
      "Inquiry Upgrade",
      "Inquiry Downgrade",
      "Inquiry Reconnection from TD",
      "Inquiry Reconnection from OP",
      "Other Aftersales Inquiry",
      "General Inquiries",
      "SSC Info",
      "Product Inquiry",
      "Promo Inquiry",
    ],
    "Aftersales Request": [
      "Account Maintenance",
      "Account Migration",
      "Bridge Mode Configuration",
      "Change Number",
      "Disconnection",
      "Migration",
      "Reconnection",
      "Relocation",
      "Special Feature",
      "Supersedure",
      "Other Aftersales Request",
      "Upgrade",
      "Downgrade",
      "Reconnection from TD",
      "Reconnection from OP",
      "Request Balance Transfer",
      "Refund",
      "Additional Service",
      "New Application",
      "Other Request",
    ],
    "Follow-up Within SLA": [
      "Repair Complex",
      "Repair Data",
      "Repair Voice",
      "Repair Voice and Data",
      "Repair WAR SR",
      "Aftersales Reconnection from TD",
      "Aftersales Reconnection from OP",
      "Aftersales Account Maintenance",
      "Aftersales Account Migration",
      "Aftersales Bridge Mode Configuration",
      "Aftersales Change Number",
      "Aftersales Disconnection",
      "Aftersales Migration",
      "Aftersales Relocation",
      "Aftersales Special Feature",
      "Aftersales Supersedure",
      "Aftersales Upgrade",
      "Aftersales Downgrade",
      "Aftersales New Application",
    ],
    "Follow-up Beyond SLA": [
      "Repair Complex",
      "Repair Data",
      "Repair Voice",
      "Repair Voice and Data",
      "Repair WAR SR",
      "Aftersales Reconnection from TD",
      "Aftersales Reconnection from OP",
      "Aftersales Account Maintenance",
      "Aftersales Account Migration",
      "Aftersales Bridge Mode Configuration",
      "Aftersales Change Number",
      "Aftersales Disconnection",
      "Aftersales Migration",
      "Aftersales Relocation",
      "Aftersales Special Feature",
      "Aftersales Supersedure",
      "Aftersales Upgrade",
      "Aftersales Downgrade",
      "Aftersales New Application",
    ],
    Billing: [
      "Billing Inq Account Balance",
      "Billing Inq BOL",
      "Billing Inq Tolls",
      "Other Billing Inquiry",
      "Payment Details/Posting",
      "Bill Delivery Dispute",
      "MRC/NRC",
      "Payment (Unreflected/Misapplied )",
      "Rebate (Non Service)",
      "Non-receipt of Billing Invoice (BI)",
      "BOL/e PORTAL ISSUE cant access",
      "BOL/e PORTAL ISSUE  BI not visible",
      "BOL/e PORTAL ISSUE cannot download BI",
      "BOL/e PORTAL ISSUE payment module error",
      "Bills On Line",
      "Tolls/Other Charges",
      "Other Bill Concern",
      "Balance Transfer",
      "Refund",
      "SOA Request",
    ],
    Repair: [
      "VD-No Voice and Data",
      "VD-Degraded Voice and Data",
      "Cannot Browse",
      "Frequent Disconnection",
      "Low BW",
      "No Internet Connection (NIC)",
      "Redirected To PLDT Sites",
      "Selective Browsing",
      "Webpage Not Loading",
      "Cannot Call To Specific Number",
      "Cannot Receive Call",
      "Continuous/Delayed Dialtone",
      "Cut Calls",
      "Fast Busy Tone",
      "No Dialtone",
      "Noisy",
      "Poor Reception/Transmission",
    ],
    ProductServices: [
      "Account Maintenance",
      "Account Migration",
      "Bridge Mode Configuration",
      "Change Number",
      "Disconnection",
      "Migration",
      "Reconnection",
    ],
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
