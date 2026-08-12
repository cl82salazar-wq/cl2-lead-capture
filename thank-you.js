(function () {
  "use strict";

  var SUPPORT_EMAIL = "cl82salazar@gmail.com";
  var SLA_HOURS = "24";
  var ETSY_SHOP_URL = ""; // TODO
  var WEBSITE_URL = "https://cl2-smart-services.myshopify.com";

  var lead = null;
  var filename = "";
  try {
    lead = JSON.parse(sessionStorage.getItem("cl2_last_lead") || "null");
    filename = sessionStorage.getItem("cl2_last_lead_file") || "";
  } catch (e) {
    lead = null;
  }

  var summary = document.getElementById("lead-summary");
  var fileNote = document.getElementById("file-note");
  var mailBtn = document.getElementById("email-lead-btn");
  var etsyBtn = document.getElementById("etsy-btn");
  var homeBtn = document.getElementById("home-btn");

  if (etsyBtn) {
    if (ETSY_SHOP_URL) {
      etsyBtn.href = ETSY_SHOP_URL;
    } else {
      etsyBtn.href = "#";
      etsyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("TODO: set your Etsy shop URL in thank-you.js / form.js (ETSY_SHOP_URL).");
      });
      etsyBtn.title = "TODO: paste Etsy shop URL";
    }
  }

  if (homeBtn) {
    if (WEBSITE_URL) {
      homeBtn.href = WEBSITE_URL;
    } else {
      homeBtn.href = "index.html";
    }
  }

  if (lead && summary) {
    summary.hidden = false;
    summary.innerHTML =
      "<dt>Name</dt><dd>" + esc(lead.name) + "</dd>" +
      "<dt>Email</dt><dd>" + esc(lead.email) + "</dd>" +
      "<dt>Help with</dt><dd>" + esc(lead.what_can_we_help_with) + "</dd>" +
      (lead.product_type ? "<dt>Product</dt><dd>" + esc(lead.product_type) + "</dd>" : "") +
      "<dt>Message</dt><dd>" + esc(lead.tell_us_more) + "</dd>";
  }

  if (fileNote) {
    if (filename) {
      fileNote.textContent =
        "A JSON lead file (" + filename + ") was downloaded to this device. Import or paste it into your Leads tab.";
    } else {
      fileNote.textContent =
        "If the JSON download did not start, go back and submit again, or email " + SUPPORT_EMAIL + " directly.";
    }
  }

  if (mailBtn && lead) {
    mailBtn.href = buildMailto(lead);
  } else if (mailBtn) {
    mailBtn.href = "mailto:" + encodeURIComponent(SUPPORT_EMAIL)
      + "?subject=" + encodeURIComponent("CL2 website lead follow-up");
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildMailto(leadObj) {
    var subject = "[CL2 Lead] " + leadObj.what_can_we_help_with + " — " + leadObj.name;
    var body = [
      "New website lead",
      "",
      "Name: " + leadObj.name,
      "Email: " + leadObj.email,
      "Help with: " + leadObj.what_can_we_help_with,
      "Product: " + (leadObj.product_type || "(blank)"),
      "Qty: " + (leadObj.quantity || "(blank)"),
      "Deadline: " + (leadObj.deadline || "(blank)"),
      "Found us: " + (leadObj.how_did_you_find_us || "(blank)"),
      "",
      "Message:",
      leadObj.tell_us_more,
      "",
      leadObj.anything_else ? ("Anything else:\n" + leadObj.anything_else + "\n") : "",
      "Submitted: " + leadObj.submitted_at,
      "",
      "→ Log on Leads tab: source = Website_form, status = New"
    ].join("\n");
    if (body.length > 1600) {
      body = body.slice(0, 1550) + "\n\n[truncated — see downloaded JSON]";
    }
    return "mailto:" + encodeURIComponent(SUPPORT_EMAIL)
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(body);
  }

  // Show SLA
  var slaEls = document.querySelectorAll("[data-sla]");
  for (var i = 0; i < slaEls.length; i++) {
    slaEls[i].textContent = SLA_HOURS;
  }

  var supportEls = document.querySelectorAll("[data-support-email]");
  for (var j = 0; j < supportEls.length; j++) {
    supportEls[j].textContent = SUPPORT_EMAIL;
    if (supportEls[j].tagName === "A") {
      supportEls[j].href = "mailto:" + SUPPORT_EMAIL;
    }
  }
})();
